import TileResolver from '../TileResolver';

/**
 * Creates the layer that will be drawn when called.
 * @param {Level} level
 * @param {Matrix} tiles
 * @param {SpriteSheet} sprites
 * @return {Function} Function to draw the layer
 */
export function createBackgroundLayer(level, tiles, sprites) {
  const resolver = new TileResolver(tiles);

  const buffer = document.createElement('canvas');
  buffer.width = 256 + 16;
  buffer.height = 240;

  const context = buffer.getContext('2d');
  /**
   * Redraws what we need on the level.
   * @param {Number} startIndex
   * @param {Number} endIndex
   */
  function redraw(startIndex, endIndex) {
    context.clearRect(0, 0, buffer.width, buffer.height);

    for (let x = startIndex; x <= endIndex; x += 1) {
      const col = tiles.grid[x];
      if (col) {
        col.forEach((tile, y) => {
          if (sprites.animations.has(tile.name)) {
            sprites.drawAnim(
                tile.name, context, x - startIndex, y, level.totalTime);
          } else {
            sprites.drawTile(tile.name, context, x - startIndex, y);
          }
        });
      }
    }
  }

  return function drawBackgroundLayer(context, camera) {
    const drawWidth = resolver.toIndex(camera.size.x);
    const drawFrom = resolver.toIndex(camera.pos.x);
    const drawTo = drawFrom + drawWidth;
    redraw(drawFrom, drawTo);
    context.drawImage(buffer, -camera.pos.x % 16, -camera.pos.y);
  };
}
