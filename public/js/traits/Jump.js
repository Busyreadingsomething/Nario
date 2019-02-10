import {Trait, Sides} from '../Entity';

/** Jump class for entities. */
export default class Jump extends Trait {
  /** Sets the name. */
  constructor() {
    super('jump');

    this.ready = 0;
    this.duration = 0.3;
    this.velocity = 200;
    this.engageTime = 0;
    this.requestTime = 0;
    this.gracePeriod = 0.1;
    this.speedBoost = 0.3;
  }

  /** Calls if falling or not. */
  get falling() {
    return this.ready < 0;
  }

  /** Starts the jump. */
  start() {
    this.requestTime = this.gracePeriod;
  }

  /** Cancels the jump. */
  cancel() {
    this.engageTime = 0;
  }

  /**
   * Sets the read to true if obstructed by bottom.
   * @param {Entity} entity Sprite entity.
   * @param {String} side side of obstruction.
   */
  obstruct(entity, side) {
    if (side === Sides.BOTTOM) {
      this.ready = 1;
    } else if (side === Sides.TOP) {
      this.cancel();
    }
  }

  /**
   * Updates the entity position based on time and velocity.
   * Sets ready to false.
   * @param {Entity} entity Sprite entity
   * @param {Number} deltaTime Change in time
   */
  update(entity, deltaTime) {
    if (this.requestTime > 0) {
      if (this.ready > 0) {
        this.engageTime = this.duration;
        this.requestTime = 0;
      }

      this.requestTime -= deltaTime;
    }
    if (this.engageTime > 0) {
      entity.vel.y =
        -(this.velocity + Math.abs(entity.vel.x) * this.speedBoost);
      this.engageTime -= deltaTime;
    }

    this.ready -= 1;
  }
}
