import {Trait} from '../Entity';

/** Jump class for entities. */
export default class Go extends Trait {
  /** Sets the name. */
  constructor() {
    super('go');
    this.dir = 0;
    this.acceleration = 400;
    this.deceleration = 300;
    this.dragFactor = 1/5000;
    this.distance = 0;
    this.heading = 1;
  }

  /**
   * Updates the entity position based on time and velocity.
   * @param {Entity} entity Sprite entity
   * @param {Number} deltaTime Change in time
   */
  update(entity, deltaTime) {
    const absX = Math.abs(entity.vel.x);

    if (this.dir !== 0) {
      entity.vel.x += this.acceleration * deltaTime * this.dir;

      if (entity.jump && !entity.jump.falling) {
        this.heading = this.dir;
      } else if (!entity.jump) {
        this.heading = this.dir;
      }
    } else if (entity.vel.x !== 0) {
      const decel = Math.min(absX, this.deceleration * deltaTime);
      entity.vel.x += entity.vel.x > 0 ? -decel : decel;
    } else {
      this.distance = 0;
    }

    const drag = this.dragFactor * entity.vel.x * absX;
    entity.vel.x -= drag;

    this.distance += absX * deltaTime;
  }
}
