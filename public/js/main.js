import Compositor from './Compositor';
import {loadLevel} from './loaders';
import {loadMarioSprite, loadBackgroundSprites} from './sprites';
import {createBackgroundLayer} from './layers';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

/**
 * Creates a sprite layer to be drawn later
 * @param {SpriteSheet} sprite Sprite information
 * @param {Vector} position Location of the sprite
 * @return {drawSpriteLayer} function to draw sprite when called
 */
export function createSpriteLayer(sprite, position) {
  return function drawSpriteLayer(context) {
    for (let i = 0; i < 20; i += 1) {
      sprite.draw('idle', context, position.x + i * 16, position.y);
    }
  };
}

Promise.all([
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel('1-1'),
]).then(([marioSprite, backgroundSprites, level]) => {
  const comp = new Compositor();
  const backgroundLayer =
    createBackgroundLayer(level.backgrounds, backgroundSprites);
  comp.layers.push(backgroundLayer);

  const pos = {
    x: 0,
    y: 0,
  };

  const spriteLayer = createSpriteLayer(marioSprite, pos);
  comp.layers.push(spriteLayer);

  /**
   * Animates Mario's position with built in
   * {@link requestAnimationFrame}
   */
  function update() {
    comp.draw(context);
    pos.x += 2;
    pos.y += 2;
    requestAnimationFrame(update);
  }
  update();
});
