import {Trait} from '../Entity';

/** Jump class for entities. */
export default class Jump extends Trait {
  /** Sets the name. */
  constructor() {
    super('jump');

    this.duration = 0.5;
    this.velocity = 200;
    this.engageTime = 0;
  }

  /** Starts the jump. */
  start() {
    this.engageTime = this.duration;
  }

  /** Cancels the jump. */
  cancel() {
    this.engageTime = 0;
  }

  /**
   * Updates the entity position based on time and velocity.
   * @param {Entity} entity Sprite entity
   * @param {Number} deltaTime Change in time
   */
  update(entity, deltaTime) {
    if (this.engageTime > 0) {
      console.log('this was HIT');
      entity.vel.y = -this.velocity;
      this.engageTime -= deltaTime;
    }
  }
}
