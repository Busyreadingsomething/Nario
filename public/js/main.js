import Compositor from './Compositor';
import Timer from './Timer';
import {loadLevel} from './loaders';
import {createMario} from './entities';
import {loadBackgroundSprites} from './sprites';
import {createBackgroundLayer, createSpriteLayer} from './layers';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  createMario(),
  loadBackgroundSprites(),
  loadLevel('1-1'),
]).then(([mario, backgroundSprites, level]) => {
  const comp = new Compositor();
  const backgroundLayer =
    createBackgroundLayer(level.backgrounds, backgroundSprites);
  comp.layers.push(backgroundLayer);

  const gravity = 30;
  mario.pos.set(64, 180);
  mario.vel.set(200, -600);

  const spriteLayer = createSpriteLayer(mario);
  comp.layers.push(spriteLayer);

  const timer = new Timer(1/60);

  /**
   * Updates Mario's position based on the time and velocity through
   * {@link requestAnimationFrame}. The delta time sets the framerate,
   * and the accumulated time makes sure that the speed of the calculation
   * doesn't mess with the animation.
   * @param {Number} deltaTime milliseconds of the call.
   */
  timer.update = function update(deltaTime) {
    comp.draw(context);
    mario.update(deltaTime);
    mario.vel.y += gravity;
  };

  timer.start();
});
