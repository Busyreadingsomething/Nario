import Entity, {Trait} from '../Entity';
import Killable from '../traits/Killable';
import PendulumMove from '../traits/PendulumMove';
import {loadSpriteSheet} from '../loaders';
import Solid from '../traits/Solid';
import Physics from '../traits/Physics';
import Sound from '../sounds/Sound';

/** Goomba Behavior class. */
class Behavior extends Trait {
  /** Sets up the trait name. */
  constructor() {
    super('behavior');
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
        us.killable.kill();
        us.squash();
        us.pendulumMove.speed = 0;
      } else {
        them.killable.kill();
      }
    } else {
      // console.log("BEFORE", us.pendulumMove.speed);
      // us.pendulumMove.speed *= -1;
      // // them.pendulumMove.speed *= -1;
      // console.log("AFTER", us.pendulumMove.speed);
    }
  }
}

/**
 * Creates the goomba entity with the draw and update methods.
 * @return {Promise<Entity>} goomba entity
 */
export function loadGoomba() {
  return loadSpriteSheet('goomba').then(createGoombaFactory);
}

/**
 * Generates the create Goomba Function.
 * @param {SpriteSheet} sprite
 * @return {Function} Creates goomba function.
 */
function createGoombaFactory(sprite) {
  const walkAnim = sprite.animations.get('walk');

  /**
   * Routes the animation based on the scenario.
   * @param {Entity} goomba
   * @return {Function} Animation for the goomba.
   */
  function routeAnim(goomba) {
    if (goomba.killable.dead) {
      return 'flat';
    }
    return walkAnim(goomba.lifetime);
  }

  /**
   * @param {Canvas} context
   */
  function drawGoomba(context) {
    sprite.draw(routeAnim(this), context, 0, 0);  // eslint-disable-line
  };

  return function createMario() {
    const goomba = new Entity(sprite.type);
    goomba.size.set(16, 16);

    goomba.addTrait(new Physics());
    goomba.addTrait(new Solid());
    goomba.addTrait(new PendulumMove());
    goomba.addTrait(new Behavior());
    goomba.addTrait(new Killable());

    goomba.fx = {
      squash: new Sound('../../sounds/stomp.wav'),
    };

    goomba.squash = () => {
      goomba.fx.squash.sound.play();
    };
    goomba.draw = drawGoomba;

    return goomba;
  };
}
