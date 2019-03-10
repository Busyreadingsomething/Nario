import TileResolver from './TileResolver';
import {Sides} from './Entity';

/** Class to test collisions. */
export default class TileCollider {
  /**
   * Sets tiles to the state.
   * @param {Array<Object>} tileMatrix Tile ot test
   */
  constructor(tileMatrix) {
    this.tiles = new TileResolver(tileMatrix);
  }

  /**
   * Checks the y collision and resolves.
   * @param {Entity} entity Sprite entity
   */
  checkY(entity) {
    let y;
    if (entity.vel.y > 0) {
      y = entity.bounds.bottom;
    } else if (entity.vel.y < 0) {
      y = entity.bounds.top;
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(
        entity.bounds.left, entity.bounds.right,
        y, y);

    matches.forEach((match) => {
      if (match.tile.type !== 'ground') {
        return;
      }

      if (entity.vel.y > 0) {
        if (entity.bounds.bottom > match.y1) {
          entity.obstruct(Sides.BOTTOM, match);
        }
      } else if (entity.vel.y < 0) {
        if (entity.bounds.top < match.y2) {
          entity.obstruct(Sides.TOP, match);
        }
      }
    });
  }

  /**
   * Checks the y collision and resolves.
   * @param {Entity} entity Sprite entity
   */
  checkX(entity) {
    let x;
    if (entity.vel.x > 0) {
      x = entity.bounds.right;
    } else if (entity.vel.x < 0) {
      x = entity.bounds.left;
    } else {
      return;
    }

    const matches = this.tiles.searchByRange(
        x, x,
        entity.bounds.top, entity.bounds.bottom);

    matches.forEach((match) => {
      if (match.tile.type !== 'ground') {
        return;
      }

      if (entity.vel.x > 0) {
        if (entity.bounds.right > match.x1) {
          entity.obstruct(Sides.RIGHT, match);
        }
      } else if (entity.vel.x < 0) {
        if (entity.bounds.left < match.x2) {
          entity.obstruct(Sides.LEFT, match);
        }
      }
    });
  }

  /**
   * Tests the collision for a given Entity.
   * @param {Entity} entity Sprite to test against
   */
  test(entity) {
    this.checkY(entity);
  }
}
