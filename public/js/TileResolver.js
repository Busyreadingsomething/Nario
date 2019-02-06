/** Class to resolve the collisions */
export default class TileResolver {
  /**
   * Sets the matrix and tilesize to the state.
   * @param {Array<Array<Object>>} matrix The level matrix.
   * @param {Number} tileSize Size of the tile.
   */
  constructor(matrix, tileSize = 16) {
    this.matrix = matrix;
    this.tileSize = tileSize;
  }

  /**
   * Convertst the position of the tile to an index.
   * @param {Number} pos location of the tile.
   * @return {Number} index of the position.
   */
  toIndex(pos) {
    return Math.floor(pos/this.tileSize);
  }

  /**
   * Gets the range to search. Index agnostic.
   * @param {Number} pos1 First position.
   * @param {Number} pos2 Second position.
   * @return {Array<Number>} range of indexes.
   */
  toIndexRange(pos1, pos2) {
    const pMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
    const range = [];
    let pos = pos1;

    do {
      range.push(this.toIndex(pos));
      pos += this.tileSize;
    } while (pos < pMax);

    return range;
  }

  /**
   * Gets the tile at X,Y of the matrix.
   * @param {Number} indexX Index of matrix X
   * @param {Number} indexY Index of matrix Y
   * @return {Object} Tile data or undefined
   */
  getByIndex(indexX, indexY) {
    const tile = this.matrix.get(indexX, indexY);
    if (tile) {
      const x1 = indexX * this.tileSize;
      const x2 = x1 + this.tileSize;
      const y1 = indexY * this.tileSize;
      const y2 = y1 + this.tileSize;
      return {
        tile,
        x1,
        x2,
        y1,
        y2,
      };
    }
  }

  /**
   * Convertst the position to index and gets associated tile.
   * @param {Number} posX Position at X
   * @param {Number} posY Position at Y
   * @return {Object} Data about the tile.
   */
  searchByPosition(posX, posY) {
    return this.getByIndex(
        this.toIndex(posX),
        this.toIndex(posY));
  }


  /**
   * Searches through a range.
   * @param {Number} x1 1st X pos
   * @param {Number} x2 2nd X pos
   * @param {Number} y1 1st Y pos
   * @param {Number} y2 2nd Y pos
   * @return {Array<Number>} Range of matches.
   */
  searchByRange(x1, x2, y1, y2) {
    const matches = [];
    this.toIndexRange(x1, x2).forEach((indexX) => {
      this.toIndexRange(y1, y2).forEach((indexY) => {
        const match = this.getByIndex(indexX, indexY);
        if (match) matches.push(match);
      });
    });

    return matches;
  }
}
