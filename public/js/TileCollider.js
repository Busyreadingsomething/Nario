import TileResolver from './TileResolver';

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
      y = entity.pos.y + entity.size.y;
    } else if (entity.vel.y < 0) {
      y = entity.pos.y;
    } else {
      return;
    }
    const matches = this.tiles.searchByRange(
        entity.pos.x, entity.pos.x + entity.size.x,
        y, y);

    matches.forEach((match) => {
      if (match.tile.type !== 'ground') {
        return;
      }

      if (entity.vel.y > 0) {
        if (entity.pos.y + entity.size.y > match.y1) {
          entity.pos.y = match.y1 - entity.size.y;
          entity.vel.y = 0;
        }
      } else if (entity.vel.y < 0) {
        if (entity.pos.y < match.y2) {
          entity.pos.y = match.y2;
          entity.vel.y = 0;
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
      x = entity.pos.x + entity.size.x;
    } else if (entity.vel.x < 0) {
      x = entity.pos.x;
    } else {
      return;
    }
    const matches = this.tiles.searchByRange(
        x, x,
        entity.pos.y, entity.pos.y + entity.size.y);

    matches.forEach((match) => {
      if (match.tile.type !== 'ground') {
        return;
      }

      if (entity.vel.x > 0) {
        if (entity.pos.x + entity.size.x > match.x1) {
          entity.pos.x = match.x1 - entity.size.x;
          entity.vel.x = 0;
        }
      } else if (entity.vel.x < 0) {
        if (entity.pos.x < match.x2) {
          entity.pos.x = match.x2;
          entity.vel.x = 0;
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
