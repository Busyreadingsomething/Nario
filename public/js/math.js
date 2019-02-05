/** Vector class. */
export class Vec2 {
  /**
   * Sets the initial position.
   * @param {Number} x X position
   * @param {Number} y Y position
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Sets the position.
   * @param {Number} x X position
   * @param {Number} y Y position
   */
  set(x, y) {
    this.x = x;
    this.y = y;
  }
}
