const WAIT = 4000;

/** @param {Context} context */
function blackScreen(context) {
  const {height, width} = context.canvas;
  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);
}

/**
 * Draws player status.
 * @param {Context} context
 * @param {Font} font
 * @param {Entity} mario
 * @param {Number} lives
 */
function playerStatus(context, font, {player, lives}) {
  font.print('WORLD', context, 80, 96);
  font.print('1-1', context, 128, 96);
  player.draw(context, 88, 120);
  font.print('x', context, 112, 128);
  font.print(lives.toString(), context, 136, 128);
}

/**
 * Draws the start screen.
 * @param {Canvas} context
 * @param {Font} font
 * @param {Function} dashboard
 * @param {Entity} environment
 * @param {Function} startMethod
 */
export function createPreScreen(
    context, font, dashboard, environment, startMethod) {
  const {playerController} = environment;
  blackScreen(context);
  dashboard(context);
  playerStatus(context, font, playerController);
  setTimeout(startMethod, WAIT);
}
