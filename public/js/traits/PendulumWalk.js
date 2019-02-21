import {Sides, Trait} from '../Entity';

/** PendulumWalk class for entities. */
export default class PendulumWalk extends Trait {
  /** Sets the name. */
  constructor() {
    super('pendulumwalk');

    this.speed = -30;
  }

  /**
   * Sets the read to true if obstructed by bottom.
   * @param {Entity} entity Sprite entity.
   * @param {String} side side of obstruction.
   */
  obstruct(entity, side) {
    if (side === Sides.LEFT || side === Sides.RIGHT) {
      this.speed = -this.speed;
    }
  }

  /**
   * Updates the entity position based on time and velocity.
   * Sets ready to false.
   * @param {Entity} entity Sprite entity
   * @param {Number} deltaTime Change in time
   */
  update(entity, deltaTime) {
    entity.vel.x = this.speed;
  }
}
