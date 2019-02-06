import Timer from './Timer';
import {loadLevel} from './loaders';
import {createMario} from './entities';
import {createCollisionLayer} from './layers';
import {setUpKeyBoard} from './input';
const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  createMario(),
  loadLevel('1-1'),
]).then(([mario, level]) => {
  mario.pos.set(64, 64);

  level.comp.layers.push(createCollisionLayer(level));

  level.entities.add(mario);

  const input = setUpKeyBoard(mario);
  input.listenTo(window);

  const timer = new Timer(1/60);

  /**
   * Updates Mario's position based on the time and velocity through
   * {@link requestAnimationFrame}. The delta time sets the framerate,
   * and the accumulated time makes sure that the speed of the calculation
   * doesn't mess with the animation.
   * @param {Number} deltaTime milliseconds of the call.
   */
  timer.update = function update(deltaTime) {
    level.update(deltaTime);
    level.comp.draw(context);
  };

  timer.start();
});
