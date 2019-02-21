import Entity from '../Entity';
import PendulumWalk from '../traits/PendulumWalk';
import {loadSpriteSheet} from '../loaders';

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
   * @param {Canvas} context
   */
  function drawGoomba(context) {
    sprite.draw(walkAnim(this.lifetime), context, 0, 0);  // eslint-disable-line
  };

  return function createMario() {
    const goomba = new Entity();
    goomba.size.set(16, 16);

    goomba.addTrait(new PendulumWalk());

    goomba.draw = drawGoomba;

    return goomba;
  };
}
