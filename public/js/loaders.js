import Level from './Level';
import SpriteSheet from './SpriteSheet';
import {createBackgroundLayer, createSpriteLayer} from './layers';

/**
 * Loads the image of the on the load event
 * @param {string} url file path of the image
 * @return {Promise<Undefined>} image being loaded and listener being added
 */
export function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.src = url;
  });
}

/**
 * Loads the JSON.
 * @param {String} url locaation of JSON
 * @return {JSON} JSON file.
 */
function loadJSON(url) {
  return fetch(url).then((r) => r.json());
}

/**
 * Adds the tiles to the level.
 * @param {Level} level level of the game
 * @param {Array} backgrounds List of backgrounds
 */
function createTiles(level, backgrounds) {
  /**
   * Parses the range.
   * @param {Object} background Data with the background info.
   * @param {Number} xStart Start of X
   * @param {Number} xLen Length of X
   * @param {Number} yStart Start of Y
   * @param {Number} yLen Length of Y
   */
  function applyRange(background, xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; x += 1) {
      for (let y = yStart; y < yEnd; y += 1) {
        level.tiles.set(x, y, {
          name: background.tile,
          type: background.type,
        });
      }
    }
  }
  backgrounds.forEach((background) => {
    background.ranges.forEach((range) => {
      if (range.length === 4) {
        applyRange(background, ...range);
      } else if (range.length === 3) {
        const [xStart, xLen, yStart] = range;
        applyRange(background, xStart, xLen, yStart, 1);
      } else if (range.length === 2) {
        const [xStart, yStart] = range;
        applyRange(background, xStart, 1, yStart, 1);
      }
    });
  });
};

/**
 * Loads the sprite sheet.
 * @param {String} name of sheet.
 * @return {JSON} Sheet information.
 */
function loadSpriteSheet(name) {
  return loadJSON(`/sprites/${name}.json`)
      .then((sheetSpec) => Promise.all([
        sheetSpec,
        loadImage(sheetSpec.imageURL),
      ]))
      .then(([sheetSpec, image]) => {
        const sprites = new SpriteSheet(
            image, sheetSpec.tileW, sheetSpec.tileH);

        sheetSpec.tiles.forEach((tileSpec) => {
          sprites.defineTile(
              tileSpec.name, tileSpec.index[0], tileSpec.index[1]);
        });
        return sprites;
      });
}

/**
 * Loads the level.
 * @param {String} name the name of the level to be loaded
 * @return {Promise<JSON>}Json file of the level
 */
export function loadLevel(name) {
  return loadJSON(`/levels/${name}.json`)
      .then((levelSpec) => Promise.all([
        levelSpec,
        loadSpriteSheet(levelSpec.spriteSheet),
      ])).then(([levelSpec, backgroundSprites]) => {
        const level = new Level();

        createTiles(level, levelSpec.backgrounds);

        const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
        level.comp.layers.push(backgroundLayer);

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level;
      });
}
