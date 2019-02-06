/** Sets the tile matrix for the level */
export class Matrix {
  /** Sets the to be an empty array. */
  constructor() {
    this.grid = [];
  }

  /**
   * Gets the tile on the grid.
   * @param {Number} x Position on grid x
   * @param {Number} y Position on grid y
   * @return {Object} Tile object.
   */
  get(x, y) {
    const col = this.grid[x];

    if (col) {
      return col[y];
    }
  }
  /**
   * Sets the tile position.
   * @param {Number} x Position on grid x
   * @param {Number} y Position on grid y
   * @param {Object} value Tile information
   */
  set(x, y, value) {
    if (!this.grid[x]) {
      this.grid[x] = [];
    }
    this.grid[x][y] = value;
  }
  /**
   * Iterates over the grid with the given callback.
   * @param {Function} callback Called for each value at x and y
   */
  forEach(callback) {
    this.grid.forEach((col, x) => {
      col.forEach((value, y) => {
        callback(value, x, y);
      });
    });
  }
}

/** Vector class. */
export class Vec2 {
  /**
   * Sets the initial position.
   * @param {Number} x X position
   * @param {Number} y Y position
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Sets the position.
   * @param {Number} x X position
   * @param {Number} y Y position
   */
  set(x, y) {
    this.x = x;
    this.y = y;
  }
}
