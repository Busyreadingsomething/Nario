import Level from './Level';
import {createBackgroundLayer, createSpriteLayer} from './layers';
import {loadBackgroundSprites} from './sprites';

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
 * Adds the tiles to the level.
 * @param {Level} level level of the game
 * @param {Array} backgrounds List of backgrounds
 */
function createTiles(level, backgrounds) {
  backgrounds.forEach((background) => {
    background.ranges.forEach(([x1, x2, y1, y2]) => {
      for (let x = x1; x < x2; x += 1) {
        for (let y = y1; y < y2; y += 1) {
          level.tiles.set(x, y, {
            name: background.tile,
          });
        }
      }
    });
  });
};

/**
 * Loads the level.
 * @param {string} name the name of the level to be loaded
 * @return {Promise<Object>}Json file of the level
 */
export function loadLevel(name) {
  return Promise.all([
    fetch(`/levels/${name}.json`)
        .then((r) => r.json()),
    loadBackgroundSprites(),
  ]).then(([levelSpec, backgroundSprites]) => {
    const level = new Level();

    createTiles(level, levelSpec.backgrounds);

    const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
    level.comp.layers.push(backgroundLayer);

    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);

    return level;
  });
}
