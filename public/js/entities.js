import Entity from './Entity';
import Go from './traits/Go';
import Jump from './traits/Jump';
// import Velocity from './traits/Velocity';
import {loadMarioSprite} from './sprites';
/**
 * Creates the mario entity with the draw and update methods.
 * @return {Promise<Entity>} mario entity
 */
export function createMario() {
  return loadMarioSprite().then((sprite) => {
    const mario = new Entity();
    mario.size.set(14, 16);

    mario.addTrait(new Go());
    mario.addTrait(new Jump());
    // mario.addTrait(new Velocity());

    mario.draw = function drawMario(context) {
      sprite.draw('idle', context, this.pos.x, this.pos.y);
    };

    return mario;
  });
}
