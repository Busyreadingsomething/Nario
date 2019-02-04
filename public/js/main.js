import { resolve as _resolve } from "path";
import SpriteSheet from './SpriteSheet';
import { loadImage, loadLevel } from './loaders';

function drawBackground(background, context, sprites) {
  background.ranges.forEach(([ x1, x2, y1, y2]) => {
    for (let x = x1; x < x2; x += 1) {
      for (let y = y1; y < y2; y += 1) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');

loadImage(_resolve(__dirname, './img/tiles.png'))
  .then(image => {
    const sprites = new SpriteSheet(image, 16, 16);
    sprites.define('ground', 0, 0);
    sprites.define('sky', 3, 23);

    loadLevel('1-1')
      .then(level => {
        level.backgrounds.forEach(background => drawBackground(background, context, sprites));
      });

    for (let x = 0; x < 25; x += 1) {
      for (let y = 12; y < 14; y += 1) {
        sprites.drawTile('ground', context, x, y);
      }
    }
  });