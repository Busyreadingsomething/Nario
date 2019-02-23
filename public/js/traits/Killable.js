import {Trait} from '../Entity';

/** Killable class for entities. */
export default class Killable extends Trait {
  /** Sets the name. */
  constructor() {
    super('killable');
    this.dead = false;
    this.deadTime = 0;
    this.removeAfter = 2;
  }

  /** Kills the entity. */
  kill() {
    this.dead = true;
  }

  /** Revives the entity. */
  revive() {
    this.dead = false;
    this.deadTime = 0;
  }

  /**
   * Removes the entity if it is dead.
   * @param {Entity} entity
   * @param {Number} deltaTime
   * @param {Level} level
   */
  update(entity, deltaTime, level) {
    if (this.dead) {
      this.deadTime += deltaTime;
      if (this.deadTime > this.removeAfter) {
        level.entities.delete(entity);
      }
    }
  }
}
