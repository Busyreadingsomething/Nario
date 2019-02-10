import {Matrix} from '../math';
import Level from '../Level';
import {createBackgroundLayer, createSpriteLayer} from '../layers';
import {loadJSON, loadSpriteSheet} from '../loaders';

/**
 * @param {String} name the name of the level to be loaded
 * @return {Promise<JSON>} Json file of the level
 */
export function loadLevel(name) {
  return loadJSON(`/levels/${name}.json`)
      .then((levelSpec) => Promise.all([
        levelSpec,
        loadSpriteSheet(levelSpec.spriteSheet),
      ])).then(([levelSpec, backgroundSprites]) => {
        const level = new Level();

        const mergedTiles = levelSpec.layers.reduce(
            (mergedTiles, layerSpec) => {
              return mergedTiles.concat(layerSpec.tiles);
            }, []);

        const collisionGrid =
          createCollisionGrid(mergedTiles, levelSpec.patterns);
        level.setCollisionGrid(collisionGrid);

        levelSpec.layers.forEach((layer) => {
          const backgroundGrid =
            createBackgroundGrid(layer.tiles, levelSpec.patterns);
          const backgroundLayer =
            createBackgroundLayer(level, backgroundGrid, backgroundSprites);
          level.comp.layers.push(backgroundLayer);
        });

        const spriteLayer = createSpriteLayer(level.entities);
        level.comp.layers.push(spriteLayer);

        return level;
      });
}

/**
 * @param {Object} tiles
 * @param {Object} patterns
 * @return {Matrix} collision grid.
 */
function createCollisionGrid(tiles, patterns) {
  const grid = new Matrix();

  for (const {tile, x, y} of expandTiles(tiles, patterns)) {
    grid.set(x, y, {type: tile.type});
  }

  return grid;
}

/**
 * @param {Object} tiles
 * @param {Object} patterns
 * @return {Matrix} collision grid.
 */
function createBackgroundGrid(tiles, patterns) {
  const grid = new Matrix();

  for (const {tile, x, y} of expandTiles(tiles, patterns)) {
    grid.set(x, y, {name: tile.name});
  }

  return grid;
}

/**
 * Derives the ranges for the tiles.
 * @param {Number} xStart Start of X
 * @param {Number} xLen Length of X
 * @param {Number} yStart Start of Y
 * @param {Number} yLen Length of Y
 * @yield {Object} yields coordinates.
 */
function* expandSpan(xStart, xLen, yStart, yLen) {
  const xEnd = xStart + xLen;
  const yEnd = yStart + yLen;
  for (let x = xStart; x < xEnd; x += 1) {
    for (let y = yStart; y < yEnd; y += 1) {
      yield {x, y};
    }
  }
}

/**
 * @param {Array<Number>} range
 * @return {Generator<Object>} returns expandSpan result.
 */
function expandRange(range) {
  if (range.length === 4) {
    return expandSpan(...range);
  } else if (range.length === 3) {
    const [xStart, xLen, yStart] = range;
    return expandSpan(xStart, xLen, yStart, 1);
  } else if (range.length === 2) {
    const [xStart, yStart] = range;
    return expandSpan(xStart, 1, yStart, 1);
  }
}

/**
 * @param {Array<Tile>} ranges
 * @yield {Object} coordinate of tile
 */
function* expandRanges(ranges) {
  console.log(ranges);
  for (const range of ranges) {
    for (const item of expandRange(range)) {
      yield item;
    }
  }
}

/**
 * Adds the tiles to the level.
 * @param {Array<Object>} tiles List of tiles
 * @param {Array<Object>} patterns List of patterns
 * @return {Array<Tiles>} Tiles with position.
 */
function expandTiles(tiles, patterns) {
  const expandedTiles = [];


  /**
   * Processes the tiles layout.
   * @param {Array<Tile>} tiles
   * @param {Number} offsetX
   * @param {Number} offsetY
   */
  function walkTiles(tiles, offsetX, offsetY) {
    for (const tile of tiles) {
      for (const {x, y} of expandRanges(tile.ranges)) {
        const derivedX = x + offsetX;
        const derivedY = y + offsetY;

        if (tile.pattern) {
          const {tiles} = patterns[tile.pattern];
          walkTiles(tiles, derivedX, derivedY);
        } else {
          expandedTiles.push({
            tile,
            x: derivedX,
            y: derivedY,
          });
        }
      }
    }
  }

  walkTiles(tiles, 0, 0);

  return expandedTiles;
};
