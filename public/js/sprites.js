import {resolve as _resolve} from 'path';
import SpriteSheet from './SpriteSheet';
import {loadImage} from './loaders';

/**
 * Loads the mario Sprite.
 * @return {Promise<SpriteSheet>} Tiles spritesheet is returned.
 */
export function loadMarioSprite() {
  return loadImage(_resolve(__dirname, './img/characters.gif'))
      .then((image) => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.define('idle', 276, 44, 16, 16);
        return sprites;
      });
}

/**
 * Loads the background Sprites.
 * @return {Promise<SpriteSheet>} Tiles spritesheet is returned.
 */
export function loadBackgroundSprites() {
  return loadImage(_resolve(__dirname, './img/tiles.png'))
      .then((image) => {
        const sprites = new SpriteSheet(image, 16, 16);
        sprites.defineTile('ground', 0, 0);
        sprites.defineTile('sky', 3, 23);
        return sprites;
      });
}
