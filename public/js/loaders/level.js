import {Matrix} from '../math';
import Level from '../Level';
import {createSpriteLayer} from '../layers/sprites';
import {createBackgroundLayer} from '../layers/background';
import {loadJSON, loadSpriteSheet} from '../loaders';
import {SoundBoard} from '../sounds/Sound';

/**
 * Sets up the collision for the level.
 * @param {Object} levelSpec
 * @param {Level} level
 */
function setupCollision(levelSpec, level) {
  const mergedTiles = levelSpec.layers.reduce(
      (mergedTiles, layerSpec) => {
        return mergedTiles.concat(layerSpec.tiles);
      }, []);

  const collisionGrid =
    createCollisionGrid(mergedTiles, levelSpec.patterns);
  level.setCollisionGrid(collisionGrid);
}
/**
 * Sets up the backgrounds for the level.
 * @param {Object} levelSpec
 * @param {Level} level
 * @param {SpriteSheet} backgroundSprites
 */
function setupBackgrounds(levelSpec, level, backgroundSprites) {
  levelSpec.layers.forEach((layer) => {
    const backgroundGrid =
      createBackgroundGrid(layer.tiles, levelSpec.patterns);
    const backgroundLayer =
      createBackgroundLayer(level, backgroundGrid, backgroundSprites);
    level.comp.layers.push(backgroundLayer);
  });
}

/**
 * Sets up the level entities.
 * @param {Object} levelSpec
 * @param {Level} level
 * @param {Function} entityFactory
 */
function setupEntities(levelSpec, level, entityFactory) {
  levelSpec.entities.forEach(({name, pos}) => {
    pos.forEach(([x, y]) => {
      const createEntity = entityFactory[name];
      const entity = createEntity();
      entity.pos.set(x, y);
      entity.env = level;
      level.entities.add(entity);
    });
  });
  const spriteLayer = createSpriteLayer(level.entities);
  level.comp.layers.push(spriteLayer);
}

/**
 * Sets up the backgound music.
 * @param {Object} levelSpec
 * @param {Level} level
 */
function setupBackgroundMusic({backgroundMusic}, level) {
  if (backgroundMusic) {
    level.backgroundMusic = backgroundMusic;
    SoundBoard.fx.get('warning').sound.onended = function() {
      SoundBoard.fx.get(backgroundMusic).sound.currentTime = 0;
      SoundBoard.fx.get(backgroundMusic).sound.playbackRate = 1.4;
      SoundBoard.fx.get(backgroundMusic).play();
    };
  }
}

/**
 * @param {Object<String, Function>} entityFactory
 * @return {Function} load level funcftion
 */
export function createLevelLoader(entityFactory) {
  return function loadLevel(name) {
    return loadJSON(`/levels/${name}.json`)
        .then((levelSpec) => Promise.all([
          levelSpec,
          loadSpriteSheet(levelSpec.spriteSheet),
        ])).then(([levelSpec, backgroundSprites]) => {
          const level = new Level(levelSpec);

          setupCollision(levelSpec, level);
          setupBackgrounds(levelSpec, level, backgroundSprites);
          setupEntities(levelSpec, level, entityFactory);
          setupBackgroundMusic(levelSpec, level);

          return level;
        });
  };
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
  for (const range of ranges) {
    yield* expandRange(range);
  }
}

/**
 * Adds the tiles to the level.
 * @param {Array<Object>} tiles List of tiles
 * @param {Array<Object>} patterns List of patterns
 * @yield {Array<Tiles>} Tiles with position.
 */
function* expandTiles(tiles, patterns) {
  /**
   * Processes the tiles layout.
   * @param {Array<Tile>} tiles
   * @param {Number} offsetX
   * @param {Number} offsetY
   */
  function* walkTiles(tiles, offsetX, offsetY) {
    for (const tile of tiles) {
      for (const {x, y} of expandRanges(tile.ranges)) {
        const derivedX = x + offsetX;
        const derivedY = y + offsetY;

        if (tile.pattern) {
          const {tiles} = patterns[tile.pattern];
          yield* walkTiles(tiles, derivedX, derivedY);
        } else {
          yield {
            tile,
            x: derivedX,
            y: derivedY,
          };
        }
      }
    }
  }

  yield* walkTiles(tiles, 0, 0);
};
