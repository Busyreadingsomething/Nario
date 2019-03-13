import SpriteSheet from './SpriteSheet';
import {createAnim} from './anim';

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
export function loadJSON(url) {
  return fetch(url).then((r) => r.json());
}

/**
 * Loads the sprite sheet.
 * @param {String} name of sheet.
 * @return {JSON} Sheet information.
 */
export function loadSpriteSheet(name) {
  return loadJSON(`/sprites/${name}.json`)
      .then((sheetSpec) => Promise.all([
        sheetSpec,
        loadImage(sheetSpec.imageURL),
      ]))
      .then(([sheetSpec, image]) => {
        const sprites = new SpriteSheet(
            sheetSpec.type, image, sheetSpec.tileW, sheetSpec.tileH);

        if (sheetSpec.tiles) {
          sheetSpec.tiles.forEach((tileSpec) => {
            sprites.defineTile(
                tileSpec.name, ...tileSpec.index);
          });
        }

        if (sheetSpec.frames) {
          sheetSpec.frames.forEach((frameSpec) => {
            sprites.define(frameSpec.name, ...frameSpec.rect);
          });
        }

        if (sheetSpec.animations) {
          sheetSpec.animations.forEach((animSpec) => {
            const animation = createAnim(animSpec.frames, animSpec.frameLen);
            sprites.defineAnim(animSpec.name, animation);
          });
        }

        return sprites;
      });
}
