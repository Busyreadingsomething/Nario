import Camera from './Camera';
import Entity from './Entity';
import PlayerController from './traits/PlayerController';
import Timer from './Timer';
import {createLevelLoader} from './loaders/level';
import {loadFont} from './loaders/font';
import {loadEntities} from './entities';
import {setUpKeyBoard} from './input';
import {createCollisionLayer} from './layers/collision';
import {createDashboardLayer} from './layers/dashboard';
import {createPreScreen} from './layers/preScreen';
import {SoundBoard} from './sounds/Sound';

/**
 * Creates player environment.
 * @param {Entity} playerEntity
 * @param {Level} level
 * @return {Entity} player environment.
 */
function createPlayerEnv(playerEntity, level) {
  const playerEnv = new Entity();
  const playerControl = new PlayerController(level.timer);
  playerControl.checkpoint.set(64, 192);
  playerControl.setPlayer(playerEntity);
  playerEnv.addTrait(playerControl);
  return playerEnv;
}

/**
 * Function to load the game.
 * @param {Canvas} canvas
 */
async function main(canvas) {
  const context = canvas.getContext('2d');

  const [entityFactory, font] = await Promise.all([
    loadEntities(),
    loadFont(),
  ]);
  const loadLevel = await createLevelLoader(entityFactory);

  const level = await loadLevel('1-1');
  const camera = new Camera();

  const mario = entityFactory.mario();

  const playerEnv = createPlayerEnv(mario, level);
  const dashboard = createDashboardLayer(font, playerEnv);

  level.setPlayerEnvironment(playerEnv);
  level.controller = playerEnv.playerController;
  level.entities.add(playerEnv);

  level.comp.layers.push(createCollisionLayer(level));
  level.comp.layers.push(dashboard);

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

    camera.pos.x = Math.max(0, mario.pos.x - 100);

    level.comp.draw(context, camera);
  };

  createPreScreen(context, font, dashboard, playerEnv, () => {
    SoundBoard.fx.get(level.backgroundMusic).play()
        .then(() => timer.start())
        .catch((e) => console.log(e));
  });
}

const canvas = document.getElementById('screen');
main(canvas);
