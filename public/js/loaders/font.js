import {loadImage} from '../loaders';
import SpriteSheet from '../SpriteSheet';

const CHARS = ' !"#$%&\'()*+,-./'
  + '0123456789:;<=>?'
  + '@ABCDEFGHIJKLMNO'
  + 'PQRSTUVWXYZ[\\]^_'
  + '`abcdefghijklmno'
  + 'pqrstuvwxyz{|}~';

/** Font class to print messages */
class Font {
  /**
   * @param {SpriteSheet} sprites
   * @param {Number} size
   */
  constructor(sprites, size) {
    this.sprites = sprites;
    this.size = size;
  }

  /**
   * Prints the message.
   * @param {String} text
   * @param {Context} context
   * @param {Number} x
   * @param {Number} y
   */
  print(text, context, x, y) {
    [...text].forEach((char, pos) => {
      this.sprites.draw(char, context, x + pos * this.size, y);
    });
  }
}
/**
 * Loads the fonts for the game.
 * @return {SpriteSheet}
 */
export function loadFont() {
  return loadImage('./img/font.png')
      .then((image) => {
        const fontSprite = new SpriteSheet(image);

        const SIZE = 8;
        const ROW_LEN = image.width;

        for (const [index, char] of [...CHARS].entries()) {
          const x = index * SIZE % ROW_LEN;
          const y = Math.floor(index * SIZE / ROW_LEN) * SIZE;
          fontSprite.define(char, x, y, SIZE, SIZE);
        }
        return new Font(fontSprite, SIZE);
      });
};
