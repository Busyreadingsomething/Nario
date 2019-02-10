import Compositor from './Compositor';
import TileCollider from './TileCollider';
import {Matrix} from './math';

/** Class to set up the level composition and entitites. */
export default class Level {
  /** State has the compositor and a set of entities */
  constructor() {
    this.gravity = 1500;
    this.totalTime = 0;
    this.comp = new Compositor();
    this.entities = new Set();
    this.tiles = new Matrix();
    this.tileCollider = new TileCollider(this.tiles);
  }

  /**
   * Updates all the entities with the time change.
   * @param {Number} deltaTime Change in frame
   */
  update(deltaTime) {
    this.entities.forEach((entity) => {
      entity.update(deltaTime);

      entity.pos.x += entity.vel.x * deltaTime;
      this.tileCollider.checkX(entity);

      entity.pos.y += entity.vel.y * deltaTime;
      this.tileCollider.checkY(entity);

      entity.vel.y += this.gravity * deltaTime;
    });

    this.totalTime += deltaTime;
  }
}
