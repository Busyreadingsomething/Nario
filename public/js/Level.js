import Compositor from './Compositor';
import EntityCollider from './EntityCollider';
import TileCollider from './TileCollider';

/** Class to set up the level composition and entitites. */
export default class Level {
  /** State has the compositor and a set of entities */
  constructor() {
    this.gravity = 1500;
    this.totalTime = 0;
    this.comp = new Compositor();
    this.entities = new Set();
    this.entityCollider = new EntityCollider(this.entities);
    this.tileCollider = null;
  }

  /**
   * Sets the tileCollider with a given matrix.
   * @param {Matrix} matrix
   */
  setCollisionGrid(matrix) {
    this.tileCollider = new TileCollider(matrix);
  }

  /**
   * Updates all the entities with the time change.
   * @param {Number} deltaTime Change in frame
   */
  update(deltaTime) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime, this);

      entity.pos.x += entity.vel.x * deltaTime;
      if (entity.canCollide) {
        this.tileCollider.checkX(entity);
      }

      entity.pos.y += entity.vel.y * deltaTime;
      if (entity.canCollide) {
        this.tileCollider.checkY(entity);
      }

      entity.vel.y += this.gravity * deltaTime;
    });

    this.entities.forEach((entity) => {
      if (entity.canCollide) {
        this.entityCollider.check(entity);
      }
    });

    this.totalTime += deltaTime;
  }
}
