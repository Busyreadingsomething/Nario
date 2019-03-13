/** Sound class to create the sound effects. */
export default class Sound {
  /**
   * @param {String} src - Location of the sound/music.
   * @param {boolean} loop
   * @param {boolean} autoplay
   */
  constructor(src, loop = false, autoplay = false) {
    this.sound = document.createElement('audio');
    this.sound.src = src;
    this.sound.loop = loop;
    this.sound.autoplay = autoplay;
    document.body.appendChild(this.sound);
  }

  /** Plays the sound. */
  play() {
    this.sound.play();
  }

  /** Pauses the sound. */
  pause() {
    this.sound.pause();
  }
}