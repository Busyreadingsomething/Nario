import Entity, {Trait} from '../Entity';
import PendulumMove from '../traits/PendulumMove';
import {loadSpriteSheet} from '../loaders';
import Killable from '../traits/Killable';
import Solid from '../traits/Solid';
import Physics from '../traits/Physics';

const STATE_WALKING = Symbol('walking');
const STATE_HIDING = Symbol('hiding');
const STATE_PANIC = Symbol('panic');

/** Koopa Behavior class. */
class Behavior extends Trait {
  /** Sets up the trait name. */
  constructor() {
    super('behavior');
    this.state = STATE_WALKING;
    this.hideTime = 0;
    this.hideDuration = 5;

    this.walkSpeed = 30;
    this.panicSpeed = 300;
  }

  /**
   * Activates behavior on collision.
   * @param {Entity} us
   * @param {Entity} them
   */
  collides(us, them) {
    if (us.killable.dead) return;

    if (them.stomper) {
      if (them.vel.y > us.vel.y) {
        this.handleStomp(us, them);
      } else {
        this.handleNudge(us, them);
      }
    } else {
      // us.pendulumMove.speed *= -1;
    }
  }

  /**
   * Handles collision from the side.
   * @param {Entity} us
   * @param {Entity} them
   */
  handleNudge(us, them) {
    if (this.state === STATE_WALKING) {
      us.killable.kill();
    } else if (this.state === STATE_HIDING) {
      this.panic(us, them);
    } else if (this.state === STATE_PANIC) {
      const travelDir = Math.sign(us.vel.x);
      const impactDir = Math.sign(us.pos.x - them.pos.x);
      if (travelDir !== 0 && travelDir !== impactDir) {
        them.killable.kill();
      }
    }
  }

  /**
   * Handles the entity against a stomp.
   * @param {Entity} us
   * @param {Entity} them
   */
  handleStomp(us, them) {
    if (this.state === STATE_WALKING) {
      this.hide(us);
    } else if (this.state === STATE_HIDING) {
      us.killable.kill();
      us.vel.set(100, -200);
      us.solid.obstructs = false;
    } else if (this.state === STATE_PANIC) {
      this.hide(us);
    }
  }

  /**
   * Sets the state to hide and disables walking.
   * @param {Entity} us
   */
  hide(us) {
    us.vel.x = 0;
    us.pendulumMove.enabled = false;
    this.hideTime = 0;
    this.state = STATE_HIDING;
  }

  /**
   * Unhides the entity and enabled walking.
   * @param {Entity} us
   */
  unhide(us) {
    us.pendulumMove.enabled = true;
    us.pendulumMove.speed = this.walkSpeed;
    this.state = STATE_WALKING;
  }

  /**
   * Sets the koopa in panic mode.
   * @param {Entity} us
   * @param {Entity} them
   */
  panic(us, them) {
    us.pendulumMove.enabled = true;
    us.pendulumMove.speed = this.panicSpeed * Math.sign(them.vel.x);
    this.state = STATE_PANIC;
  }

  /**
   * Updates the entity as time goes on based on the state.
   * @param {Entity} us
   * @param {Number} deltaTime
   */
  update(us, deltaTime) {
    if (this.state === STATE_HIDING) {
      this.hideTime += deltaTime;
      if (this.hideTime > this.hideDuration) {
        this.unhide(us);
      }
    }
  }
}

/**
 * Creates the koopa entity with the draw and update methods.
 * @return {Promise<Entity>} koopa entity
 */
export function loadKoopa() {
  return loadSpriteSheet('koopa').then(createKoopaFactory);
}

/**
 * Generates the create koopa Function.
 * @param {SpriteSheet} sprite
 * @return {Function} Creates koopa function.
 */
function createKoopaFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');
  const wakeAnim = sprite.animations.get('wake');

  /**
   * Routes the animation for the koopa.
   * @param {Entity} koopa
   * @return {Function} animation function.
   */
  function routeAnim(koopa) {
    if (koopa.behavior.state === STATE_HIDING) {
      if (koopa.behavior.hideTime > 3) {
        return wakeAnim(koopa.behavior.hideTime);
      }
      return 'hiding';
    }
    if (koopa.behavior.state === STATE_PANIC) {
      return 'hiding';
    }
    return walkAnim(koopa.lifetime);
  }

  /** @param {Canvas} context */
  function drawKoopa(context) {
    sprite.draw(routeAnim(this), context, 0, 0, this.vel.x < 0);  // eslint-disable-line
  };

  return function createKoopa() {
    const koopa = new Entity(sprite.type);
    koopa.size.set(16, 16);
    koopa.offset.y = 8;

    koopa.addTrait(new Physics());
    koopa.addTrait(new Solid());
    koopa.addTrait(new PendulumMove());
    koopa.addTrait(new Behavior());
    koopa.addTrait(new Killable());

    koopa.draw = drawKoopa;

    return koopa;
  };
}
