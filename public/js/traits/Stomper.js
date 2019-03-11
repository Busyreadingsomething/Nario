import {Trait} from '../Entity';

/** Stomper class for entities. */
export default class Stomper extends Trait {
  /** Sets the name. */
  constructor() {
    super('stomper');
    this.bounceSpeed = 400;
    this.onStomp = function() {};
  }

  /**
   * Sets the queueBounce to true.
   * @param {Entity} us
   * @param {Entity} them
   */
  bounce(us, them) {
    us.bounds.bottom = them.bounds.top;
    us.vel.y = -this.bounceSpeed;
  }

  /**
   * Checks the collision with the entity.
   * @param {Entity} us
   * @param {Entity} them
   */
  collides(us, them) {
    if (!them.killable || them.killable.dead) return;

    if (us.vel.y > them.vel.y) {
      this.bounce(us, them);
      this.onStomp(us, them);
    }
  }
}
