import {Trait} from '../Entity';
import {Vec2} from '../math';

/** Killable class for entities. */
export default class PlayerController extends Trait {
  /** Sets the name. */
  constructor() {
    super('playerController');
    this.checkpoint = new Vec2(0, 0);
    this.player = null;
  }

  /**
   * Sets the entity to the controller.
   * @param {Entity} entity
   */
  setPlayer(entity) {
    this.player = entity;
  }

  /**
   * Removes the entity if it is dead.
   * @param {Entity} entity
   * @param {Number} deltaTime
   * @param {Level} level
   */
  update(entity, deltaTime, level) {
    if (!level.entities.has(this.player)) {
      this.player.killable.revive();
      this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
      level.entities.add(this.player);
    }
  }
}
