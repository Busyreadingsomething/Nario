import {Sides, Trait} from '../Entity';

/** PendulumMove class for entities. */
export default class PendulumMove extends Trait {
  /** Sets the name. */
  constructor() {
    super('pendulumMove');
    this.enabled = true;
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
    if (this.enabled) {
      entity.vel.x = this.speed;
    }
  }
}
