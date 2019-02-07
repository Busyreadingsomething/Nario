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
