/**
 * Class to contain the sprite tiles and referenve the screen size
 */
export default class SpriteSheet {
  /**
   * Sets the state of the class
   * @param {Image} image Tile image
   * @param {Number} width Screen width
   * @param {Number} height Screen height
   */
  constructor(image, width, height) {
    this.image = image;
    this.width = width;
    this.height = height;
    this.tiles = new Map();
    this.animations = new Map();
  }

  /**
   * Sets the animation for the sprite.
   * @param {String} name name of animation
   * @param {Function} animation animation function
   */
  defineAnim(name, animation) {
    this.animations.set(name, animation);
  }

  /**
   * Creates the tile from png
   * @param {String} name Name of the tile
   * @param {Number} x X position on png
   * @param {Number} y Y position on png
   * @param {Number} width width of sprite
   * @param {Number} height height of sprite
   */
  define(name, x, y, width, height) {
    const buffers = [false, true].map((flip) => {
      const buffer = document.createElement('canvas');
      buffer.width = width;
      buffer.height = height;

      const context = buffer.getContext('2d');

      if (flip) {
        context.scale(-1, 1);
        context.translate(-width, 0);
      }

      context.drawImage(
          this.image,
          x,
          y,
          width,
          height,
          0,
          0,
          width,
          height);

      return buffer;
    });

    this.tiles.set(name, buffers);
  }

  /**
   * Calls the {@link SpriteSheet.define} with proper sprite location
   * @param {String} name Name of the sprite
   * @param {Number} x Position on screen X
   * @param {Number} y Position on screen Y
   */
  defineTile(name, x, y) {
    this.define(name, x * this.width, y * this.height, this.width, this.height);
  }

  /**
   * Draws the tile on the canvas.
   * @param {String} name Name of the tile
   * @param {Context} context Context of the canvas
   * @param {Number} x Position on the screen x
   * @param {Number} y Position on the screen y
   * @param {Boolean} flip flip the drawing
   */
  draw(name, context, x, y, flip = false) {
    const buffer = this.tiles.get(name)[flip ? 1 : 0];
    context.drawImage(buffer, x, y);
  }

  /**
   * Draws the animation for the sprite.
   * @param {String} name Name of animation.
   * @param {Canvas} context Canvas context to draw.
   * @param {Number} x Position on the screen x.
   * @param {Number} y Position on the screen y.
   * @param {Number} distance Distance for the animation step;
   */
  drawAnim(name, context, x, y, distance) {
    const animation = this.animations.get(name);
    this.drawTile(animation(distance), context, x, y);
  }

  /**
   * Calls {@link SpriteSheet.draw} with the proper position.
   * @param {String} name Name of the tile
   * @param {Context} context Context of the canvas
   * @param {Number} x Position to draw on canvas X
   * @param {Number} y Position to draw on canvas Y
   */
  drawTile(name, context, x, y) {
    this.draw(name, context, x * this.width, y * this.height);
  }
}
