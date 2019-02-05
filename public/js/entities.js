import Entity from './Entity';
import Velocity from './traits/Velocity';
import Jump from './traits/Jump';
import {loadMarioSprite} from './sprites';
/**
 * Creates the mario entity with the draw and update methods.
 * @return {Promise<Entity>} mario entity
 */
export function createMario() {
  return loadMarioSprite().then((sprite) => {
    const mario = new Entity();

    mario.addTrait(new Velocity());
    mario.addTrait(new Jump());

    mario.draw = function drawMario(context) {
      sprite.draw('idle', context, this.pos.x, this.pos.y);
    };

    return mario;
  });
}
