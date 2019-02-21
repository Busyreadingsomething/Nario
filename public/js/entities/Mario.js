import Entity from '../Entity';
import Go from '../traits/Go';
import Jump from '../traits/Jump';
import {loadSpriteSheet} from '../loaders';

const SLOW_DRAG = 1/2000;
const FAST_DRAG = 1/5000;

/**
 * Creates the mario entity with the draw and update methods.
 * @return {Promise<Entity>} mario entity
 */
export function loadMario() {
  return loadSpriteSheet('mario').then(createMarioFactory);
}

/**
 * Generates the create Mario Function.
 * @param {SpriteSheet} sprite
 * @return {Function} Creates mario function.
 */
function createMarioFactory(sprite) {
  const runAnim = sprite.animations.get('run');
  /**
   * Determines the frame for mario.
   * @param {Entity} mario Mario's sprite entity
   * @return {String} frame type
   */
  function routeFrame(mario) {
    if (mario.jump.falling) {
      return 'jump';
    }

    if (mario.go.distance > 0) {
      if ((mario.vel.x > 0 && mario.go.dir < 0)
        || (mario.vel.x < 0 && mario.go.dir > 0)) {
        return 'break';
      }
      return runAnim(mario.go.distance);
    }
    return 'idle';
  }

  /**
   * Sets the drag factor for entity.
   * @param {Boolean} turboOn
   */
  function setTurboState(turboOn) {
    this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG; // eslint-disable-line
  };

  /**
   * @param {Canvas} context
   */
  function drawMario(context) {
    sprite.draw(routeFrame(this), context, 0, 0, this.go.heading < 0); // eslint-disable-line
  };

  return function createMario() {
    const mario = new Entity();
    mario.size.set(14, 16);

    mario.addTrait(new Go());
    mario.addTrait(new Jump());

    mario.turbo = setTurboState;
    mario.draw = drawMario;

    mario.turbo(false);

    return mario;
  };
}
