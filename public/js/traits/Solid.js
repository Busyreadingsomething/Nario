import {Trait, Sides} from '../Entity';

/** Solid class for entities. */
export default class Solid extends Trait {
  /** Sets the name. */
  constructor() {
    super('solid');
    this.obstructs = true;
  }

  /**
   * Sets the read to true if obstructed by bottom.
   * @param {Entity} entity Sprite entity.
   * @param {String} side side of obstruction.
   * @param {Entity} match other entity.
   */
  obstruct(entity, side, match) {
    if (!this.obstructs) return;

    if (side === Sides.BOTTOM) {
      entity.bounds.bottom = match.y1;
      entity.vel.y = 0;
    } else if (side === Sides.TOP) {
      entity.bounds.top = match.y2;
      entity.vel.y = 0;
    } else if (side === Sides.LEFT) {
      entity.bounds.left = match.x2;
      entity.vel.x = 0;
    } else if (side === Sides.RIGHT) {
      entity.bounds.right = match.x1;
      entity.vel.x = 0;
    }
  }
}
