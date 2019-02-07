/**
 * Creates the layer that will be drawn when called.
 * @param {Level} level Level object
 * @param {SpriteSheet} sprites Sprites to be passed into each background
 * @return {drawBackgroundLayer} Function to be called to draw the later
 */
export function createBackgroundLayer(level, sprites) {
  const {tiles} = level;
  const resolver = level.tileCollider.tiles;

  const buffer = document.createElement('canvas');
  buffer.width = 256 + 16;
  buffer.height = 240;

  const context = buffer.getContext('2d');

  let startIndex;
  let endIndex;

  /**
   * Redraws what we need on the level.
   * @param {Number} drawFrom starting pposition
   * @param {Number} drawTo ending position
   */
  function redraw(drawFrom, drawTo) {
    if (drawFrom === startIndex && drawTo === endIndex) return;

    startIndex = drawFrom;
    endIndex = drawTo;

    for (let x = startIndex; x <= endIndex; x += 1) {
      const col = tiles.grid[x];
      if (col) {
        col.forEach((tile, y) =>
          sprites.drawTile(tile.name, context, x - startIndex, y));
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

/**
 * Creates a sprite layer to be drawn later
 * @param {Set<Entity>} entities Sprite information
 * @param {Number} width Width of sprite
 * @param {Number} height Height of sprite
 * @return {drawSpriteLayer} function to draw sprite when called
 */
export function createSpriteLayer(entities, width = 64, height = 64) {
  const spriteBuffer = document.createElement('canvas');
  spriteBuffer.width = width;
  spriteBuffer.height = height;

  const spriteBufferContext = spriteBuffer.getContext('2d');

  return function drawSpriteLayer(context, camera) {
    entities.forEach((entity) => {
      spriteBufferContext.clearRect(0, 0, width, height);

      entity.draw(spriteBufferContext);
      context.drawImage(
          spriteBuffer,
          entity.pos.x - camera.pos.x,
          entity.pos.y - camera.pos.y);
    });
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

  return function drawCollision(context, camera) {
    context.strokeStyle = 'blue';
    resolvedTiles.forEach(({x, y}) => {
      context.beginPath();
      context.rect(
          x * tileSize - camera.pos.x,
          y * tileSize - camera.pos.y,
          tileSize,
          tileSize);
      context.stroke();
    });

    context.strokeStyle = 'red';
    level.entities.forEach((entity) => {
      context.beginPath();
      context.rect(
          entity.pos.x - camera.pos.x,
          entity.pos.y - camera.pos.y,
          entity.size.x, entity.size.y);
      context.stroke();
    });

    resolvedTiles.length = 0;
  };
}

/**
 * Creates a layer from the camera
 * @param {Camera} cameraToDraw Camera that we draw
 * @return {Function} drawCameraRect to draw from.
 */
export function createCameraLayer(cameraToDraw) {
  return function drawCameraRect(context, fromCamera) {
    context.strokeStyle = 'purple';
    context.beginPath();
    context.rect(
        cameraToDraw.pos.x - fromCamera.pos.x,
        cameraToDraw.pos.y - fromCamera.pos.y,
        cameraToDraw.size.x, cameraToDraw.size.y);
    context.stroke();
  };
}
