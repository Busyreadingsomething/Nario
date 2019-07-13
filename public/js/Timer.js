/** Sets the timiing for the game */
export default class Timer {
  /**
   * Sets the framerate for the timer.
   * @param {Number} deltaTime framerate default at 1/60
   */
  constructor(deltaTime = 1/60) {
    let accumulatedTime = 0;
    let oldTime = 0;
    /**
     * Updates Mario's position based on the time and velocity through
     * {@link requestAnimationFrame}. The delta time sets the framerate,
     * and the accumulated time makes sure that the speed of the calculation
     * doesn't mess with the animation.
     * @param {Number} time milliseconds of the call
     */
    this.updateProxy = (time) => {
      accumulatedTime += (time - oldTime) / 1000;

      if (accumulatedTime > 1) {
        accumulatedTime = 1;
      }

      while (accumulatedTime > deltaTime) {
        this.update(deltaTime);
        accumulatedTime -= deltaTime;
      }
      oldTime = time;

      this.enqueue();
    };
  }
  /** Enqueues the next update */
  enqueue() {
    requestAnimationFrame(this.updateProxy);
  }

  /** Starts the timer. */
  start() {
    this.enqueue();
  }
}
