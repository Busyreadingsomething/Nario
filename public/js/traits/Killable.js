import {Trait} from '../Entity';

/** Killable class for entities. */
export default class Killable extends Trait {
  /**
   * Sets the kill stats of the entity.
   *
   * @param {Number} removeAfter
   */
  constructor(removeAfter = 2) {
    super('killable');
    this.dead = false;
    this.deadTime = 0;
    this.removeAfter = removeAfter;
  }

  /** Kills the entity. */
  kill() {
    this.queue(() => this.dead = true);
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
        this.queue(() => {
          level.entities.delete(entity);
        });
      }
    }
  }
}
