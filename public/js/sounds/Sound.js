import {Trait} from '../Entity';

const ROOT = '../../sounds/';
const SOUND_LIST = [
  '1-up.wav',
  'breakblock.wav',
  'bump.wav',
  'coin.wav',
  'flagpole.wav',
  'jumpSmall.wav',
  'jumpSuper.wav',
  'kick.wav',
  'overworld.mp3',
  'pipe.wav',
  'powerup.wav',
  'powerupAppears.wav',
  'stomp.wav',
  'vine.wav',
  'warning.wav',
];

/** Sound Board design. */
class SoundFxBoard extends Trait {
  /**
   * Sources of the sounds.
   * @param {Map<String, Sound>} builder
   */
  constructor(builder) {
    super('soundBoard');
    this.fx = builder.fx;
  }

  /** Gets the Builder. */
  static get Builder() {
    /** Builder Class */
    class Builder {
      /** Creates the Builder. */
      constructor() {}

      /**
       * @param {Array<String>} sources
       * @return {TestingBoard.Builder}
       */
      withFx(sources) {
        const fx = Builder.createFx(sources);
        this.fx = fx;
        return this;
      }

      /**
       * @param {Array<String>} sources
       * @return {Map<String, Audio>}
       */
      static createFx(sources) {
        const soundBoard = new Map();

        sources.forEach((sound) => {
          let loop = false;
          if (sources.includes('overworld')) {
            loop = true;
          }
          const fx = new Sound(ROOT + sound, loop);
          const [key] = sound.split('.');
          soundBoard.set(key, fx);
        });

        return soundBoard;
      }
      /** @return {SoundFxBoard} */
      build() {
        return new SoundFxBoard(this);
      }
    }
    return Builder;
  }
}

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

  /**
   * Plays the sound.
   * @return {Promise}
   */
  play() {
    this.sound.currentTime = 0;
    return this.sound.play();
  }

  /**
   * Pauses the sound.
   * @return {Promise}
   */
  pause() {
    return this.sound.pause();
  }
}

export const SoundBoard = new SoundFxBoard.Builder().withFx(SOUND_LIST).build();
