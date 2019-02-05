const PRESSED = 1;
const RELEASED = 0;

/** KeyBoard  */
export default class KeyboardState {
  /**   */
  constructor() {
    // Holds the current state of the keys
    this.keyStates = new Map();

    // Holds the callback functions for a key code
    this.keyMap = new Map();
  }

  /**
   * Added mapping between keycode and callback for object.
   * @param {Number} keycode Code of the key pressed
   * @param {Function} callback Function to add to keycode
   */
  addMapping(keycode, callback) {
    this.keyMap.set(keycode, callback);
  }

  /**
   * Handles the keyboard event
   * @param {Event} event Event from the keyboard
   */
  handleEvent(event) {
    const {keyCode} = event;

    // Did not have the key mapped.
    if (!this.keyMap.has(keyCode)) {
      return;
    }

    event.preventDefault();

    const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

    if (this.keyStates.get(keyCode) === keyState) {
      return;
    }

    this.keyStates.set(keyCode, keyState);
    console.log(this.keyStates);
    this.keyMap.get(keyCode)(keyState);
  }

  /**
   * Adds event listener.
   * @param {window} window Object to listen to.
   */
  listenTo(window) {
    ['keyup', 'keydown'].forEach((eventName) => {
      window.addEventListener(eventName, (event) => {
        this.handleEvent(event);
      });
    });
  }
}
