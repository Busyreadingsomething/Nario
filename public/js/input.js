import KeyboardState from './KeyboardState';

/**
 * Sets up the keyboard input.
 * @param {Entity} entity
 * @return {KeyboardState} keyboard input.
 */
export function setUpKeyBoard(entity) {
  const input = new KeyboardState();

  input.addMapping('Space', (keyState) => {
    if (keyState) {
      entity.jump.start();
    } else {
      entity.jump.cancel();
    }
  });

  input.addMapping('ArrowRight', (keyState) => {
    entity.go.dir = keyState;
  });

  input.addMapping('ArrowLeft', (keyState) => {
    entity.go.dir = -keyState;
  });

  return input;
}
