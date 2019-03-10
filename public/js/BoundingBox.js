/**  */
export default class BoundingBox {
  /**
   * @param {Vec2} pos Position of sprite.
   * @param {Vec2} size Size of sprite.
   * @param {Vec2} offset Sprite offset.
   */
  constructor(pos, size, offset) {
    this.pos = pos;
    this.size = size;
    this.offset = offset;
    this.spacing = 0;
  }

  /** Gets bottom position. */
  get bottom() {
    return this.pos.y + this.size.y + this.offset.y;
  }

  /** Gets top position. */
  get top() {
    return this.pos.y + this.offset.y;
  }

  /** Gets left position. */
  get left() {
    return this.pos.x + this.offset.x;
  }

  /** Gets right position. */
  get right() {
    return this.pos.x + this.size.x + this.offset.x;
  }

  /**
   * Sets bottom position.
   * @param {Number} y
   */
  set bottom(y) {
    this.pos.y = y - (this.size.y + this.offset.y);
  }

  /**
   * Sets top position.
   * @param {Number} y
   */
  set top(y) {
    this.pos.y = y - this.offset.y;
  }

  /**
   * Sets left position.
   * @param {Number} x
   */
  set left(x) {
    this.pos.x = x - this.offset.x;
  }

  /**
   * Sets right position.
   * @param {Number} x
   */
  set right(x) {
    return this.pos.x = x - (this.size.x + this.offset.x);
  }

  /**
   * Checks if there is an overlap.
   * @param {BoundingBox} box
   * @return {boolean}
   */
  overlaps(box) {
    return (this.bottom + this.spacing > box.top
      && this.top - this.spacing < box.bottom
      && this.left - this.spacing < box.right
      && this.right + this.spacing > box.left);
  }
}
