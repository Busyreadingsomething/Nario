import {Trait} from '../Entity';
/** Velocity class for entity */
export default class Velocity extends Trait {
  /** Sets the name of the velocity */
  constructor() {
    super('velocity');
  }

  /**
   * Update the entity position.
   * @param {Entity} entity Sprite entity
   * @param {Number} deltaTime change in time
   */
  update(entity, deltaTime) {
    entity.pos.x += entity.vel.x * deltaTime;
    entity.pos.y += entity.vel.y * deltaTime;
  };
}
