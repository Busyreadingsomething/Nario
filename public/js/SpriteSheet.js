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
  }

  /**
   * Creates the tile from png
   * @param {String} name Name of the tile
   * @param {Number} x X position on png
   * @param {Number} y Y position on png
   */
  define(name, x, y) {
    const buffer = document.createElement('canvas');
    buffer.width = this.width;
    buffer.height = this.height;
    buffer.getContext('2d')
        .drawImage(
            this.image,
            x * this.width,
            y * this.height,
            this.width,
            this.height,
            0,
            0,
            this.width,
            this.height);
    this.tiles.set(name, buffer);
  }

  /**
   * Draws the tile on the canvas.
   * @param {String} name Name of the tile
   * @param {Context} context Context of the canvas
   * @param {Number} x Position on the screen x
   * @param {Number} y Position on the screen y
   */
  draw(name, context, x, y) {
    const buffer = this.tiles.get(name);
    context.drawImage(buffer, x, y);
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
