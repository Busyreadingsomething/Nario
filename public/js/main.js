import Timer from './Timer';
import Camera from './Camera';
import {loadLevel} from './loaders/level';
import {createMario} from './entities';
import {setUpKeyBoard} from './input';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  createMario(),
  loadLevel('1-1'),
]).then(([mario, level]) => {
  const camera = new Camera();

  mario.pos.set(64, 64);

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

    if (mario.pos.x > 100) {
      camera.pos.x = mario.pos.x - 100;
    }

    level.comp.draw(context, camera);
  };

  timer.start();
});
