import Compositor from './Compositor';
import EntityCollider from './EntityCollider';
import TileCollider from './TileCollider';

/** Class to set up the level composition and entitites. */
export default class Level {
  /**
   * State has the compositor and a set of entities.
   *
   * @param {JSON} levelSpec
   */
  constructor({gravity, timer, backgroundMusic}) {
    this.gravity = gravity;
    this.timer = timer;
    this.totalTime = 0;
    this.comp = new Compositor();
    this.entities = new Set();
    this.entityCollider = new EntityCollider(this.entities);
    this.environment = null;
    this.tileCollider = null;
    this.backgroundMusic = backgroundMusic;
  }

  /**
   * Sets the tileCollider with a given matrix.
   * @param {Matrix} matrix
   */
  setCollisionGrid(matrix) {
    this.tileCollider = new TileCollider(matrix);
  }

  /** @param {Entity} env player environment. */
  setPlayerEnvironment(env) {
    this.environment = env;
  }

  /**
   * Updates all the entities with the time change.
   * @param {Number} deltaTime Change in frame
   */
  update(deltaTime) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime, this);
    });

    this.entities.forEach((entity) => {
      this.entityCollider.check(entity);
    });

    this.entities.forEach((entity) => {
      entity.finalize();
    });

    this.totalTime += deltaTime;
  }
}
