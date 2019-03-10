import {Trait} from '../Entity';

/** Physics class for entities. */
export default class Physics extends Trait {
  /** Sets the name. */
  constructor() {
    super('physics');
  }

  /**
   * Updates the physics on the entity.
   * @param {Entity} entity sprite being affected
   * @param {Number} deltaTime
   * @param {Level} level
   */
  update(entity, deltaTime, level) {
    entity.pos.x += entity.vel.x * deltaTime;
    level.tileCollider.checkX(entity);

    entity.pos.y += entity.vel.y * deltaTime;
    level.tileCollider.checkY(entity);

    entity.vel.y += level.gravity * deltaTime;
  }
}
