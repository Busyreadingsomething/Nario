import Timer from './Timer';
import Camera from './Camera';
import {createLevelLoader} from './loaders/level';
import {loadEntities} from './entities';
import {setUpKeyBoard} from './input';
import {createCollisionLayer} from './layers';

/**
 * Function to load the game.
 * @param {Canvas} canvas
 */
async function main(canvas) {
  const context = canvas.getContext('2d');

  const entityFactory = await loadEntities();
  const loadLevel = await createLevelLoader(entityFactory);

  const level = await loadLevel('1-1');

  const camera = new Camera();

  const mario = entityFactory.mario();
  mario.pos.set(64, 64);

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
}

const canvas = document.getElementById('screen');
main(canvas);
