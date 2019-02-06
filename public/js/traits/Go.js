import {Trait} from '../Entity';

/** Jump class for entities. */
export default class Go extends Trait {
  /** Sets the name. */
  constructor() {
    super('go');

    this.dir = 0;
    this.speed = 6000;
  }

  /**
   * Updates the entity position based on time and velocity.
   * @param {Entity} entity Sprite entity
   * @param {Number} deltaTime Change in time
   */
  update(entity, deltaTime) {
    entity.vel.x = this.speed * this.dir * deltaTime;
  }
}
