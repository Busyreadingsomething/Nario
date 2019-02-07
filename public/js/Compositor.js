/**
 * Draws the layers for each level
 */
export default class Compositor {
  /**
   * Creates the object with an empty array for layers.
   */
  constructor() {
    this.layers = [];
  }

  /**
   * Invokes each layer function with the context in the layers
   * @param {Context} context Context of the canvas
   * @param {Camera} camera The camera of the game.
   */
  draw(context, camera) {
    this.layers.forEach((layer) => layer(context, camera));
  }
}
