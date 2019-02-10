import KeyboardState from './KeyboardState';

/**
 * Sets up the keyboard input.
 * @param {Entity} mario
 * @return {KeyboardState} keyboard input.
 */
export function setUpKeyBoard(mario) {
  const input = new KeyboardState();

  input.addMapping('KeyP', (keyState) => {
    keyState ? mario.jump.start() : mario.jump.cancel();
  });

  input.addMapping('KeyO', (keyState) => {
    mario.turbo(keyState);
  });

  input.addMapping('KeyD', (keyState) => {
    mario.go.dir += keyState ? 1 : -1;
  });

  input.addMapping('KeyA', (keyState) => {
    mario.go.dir += keyState ? -1 : 1;
  });

  return input;
}
