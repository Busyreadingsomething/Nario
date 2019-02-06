/**
 * Creates the layer that will be drawn when called.
 * @param {Level} level Level object
 * @param {SpriteSheet} sprites Sprites to be passed into each background
 * @return {drawBackgroundLayer} Function to be called to draw the later
 */
export function createBackgroundLayer(level, sprites) {
  const buffer = document.createElement('canvas');
  buffer.width = 256;
  buffer.height = 240;

  const context = buffer.getContext('2d');

  level.tiles.forEach((tile, x, y) => {
    sprites.drawTile(tile.name, context, x, y);
  });

  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0);
  };
}

/**
 * Creates a sprite layer to be drawn later
 * @param {Set<Entity>} entities Sprite information
 * @return {drawSpriteLayer} function to draw sprite when called
 */
export function createSpriteLayer(entities) {
  return function drawSpriteLayer(context) {
    entities.forEach((entity) => entity.draw(context));
  };
}

/**
 * Creates the collision layer.
 * @param {Level} level Current level of the game.
 * @return {Function} drawCollision function;
 */
export function createCollisionLayer(level) {
  const resolvedTiles = [];
  const tileResolver = level.tileCollider.tiles;
  const tileSize = tileResolver.tileSize;

  const getByIndexOriginal = tileResolver.getByIndex;
  tileResolver.getByIndex = function getByIndexFake(x, y) {
    resolvedTiles.push({x, y});
    return getByIndexOriginal.call(tileResolver, x, y);
  };

  return function drawCollision(context) {
    context.strokeStyle = 'blue';
    resolvedTiles.forEach(({x, y}) => {
      context.beginPath();
      context.rect(
          x * tileSize,
          y * tileSize,
          tileSize,
          tileSize);
      context.stroke();
    });

    context.strokeStyle = 'red';
    level.entities.forEach((entity) => {
      context.beginPath();
      context.rect(
          entity.pos.x, entity.pos.y,
          entity.size.x, entity.size.y);
      context.stroke();
    });

    resolvedTiles.length = 0;
  };
}
