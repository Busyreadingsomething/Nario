import Entity from '../Entity';
import PendulumWalk from '../traits/PendulumWalk';
import {loadSpriteSheet} from '../loaders';

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

  /** @param {Canvas} context */
  function drawKoopa(context) {
    sprite.draw(walkAnim(this.lifetime), context, 0, 0, this.vel.x < 0);  // eslint-disable-line
  };

  return function createKoopa() {
    const koopa = new Entity();
    koopa.size.set(16, 16);
    koopa.offset.y = 8;

    koopa.addTrait(new PendulumWalk());

    koopa.draw = drawKoopa;

    return koopa;
  };
}
