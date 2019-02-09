const PRESSED = 1;
const RELEASED = 0;

/** KeyBoard  */
export default class KeyboardState {
  /** Holds state of keys and maps the functinos to the code. */
  constructor() {
    this.keyStates = new Map();
    this.keyMap = new Map();
  }

  /**
   * Added mapping between code and callback for object.
   * @param {Number} code Code of the key pressed
   * @param {Function} callback Function to add to code
   */
  addMapping(code, callback) {
    this.keyMap.set(code, callback);
  }

  /**
   * Handles the keyboard event
   * @param {Event} event Event from the keyboard
   */
  handleEvent(event) {
    const {code} = event;

    // Did not have the key mapped.
    if (!this.keyMap.has(code)) {
      return;
    }

    event.preventDefault();

    const keyState = event.type === 'keydown' ? PRESSED : RELEASED;

    if (this.keyStates.get(code) === keyState) {
      return;
    }

    this.keyStates.set(code, keyState);
    this.keyMap.get(code)(keyState);
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
