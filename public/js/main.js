import Timer from './Timer';
import Camera from './Camera';
import {loadLevel} from './loaders/level';
import {loadEntities} from './entities';
import {setUpKeyBoard} from './input';
import {createCollisionLayer} from './layers';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

Promise.all([
  loadEntities(),
  loadLevel('1-1'),
]).then(([entity, level]) => {
  const camera = new Camera();

  const mario = entity.mario();
  mario.pos.set(64, 64);

  const goomba = entity.goomba();
  goomba.pos.x = 220;
  level.entities.add(goomba);

  const koopa = entity.koopa();
  koopa.pos.x = 260;
  level.entities.add(koopa);

  level.entities.add(mario);

  level.comp.layers.push(createCollisionLayer(level));

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
