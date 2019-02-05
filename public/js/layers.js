/**
 * Draws the background based on the given level background.
 * @param {Object} background information about the background
 * @param {Context} context Canvas context
 * @param {SpriteSheet} sprites Contains the sheet of sprites
 */
function drawBackground(background, context, sprites) {
  background.ranges.forEach(([x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; x += 1) {
      for (let y = y1; y < y2; y += 1) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

/**
 * Creates the layer that will be drawn when called.
 * @param {Level} backgrounds Contains the level backgrounds
 * @param {SpriteSheet} sprites Sprites to be passed into each background
 * @return {drawBackgroundLayer} Function to be called to draw the later
 */
export function createBackgroundLayer(backgrounds, sprites) {
  const buffer = document.createElement('canvas');
  buffer.width = 256;
  buffer.height = 240;

  backgrounds.forEach((background) =>
    drawBackground(background, buffer.getContext('2d'), sprites));

  return function drawBackgroundLayer(context) {
    context.drawImage(buffer, 0, 0);
  };
}

/**
 * Creates a sprite layer to be drawn later
 * @param {Entity} entity Sprite information
 * @return {drawSpriteLayer} function to draw sprite when called
 */
export function createSpriteLayer(entity) {
  return function drawSpriteLayer(context) {
    entity.draw(context);
  };
}
