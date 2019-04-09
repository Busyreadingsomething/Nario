import {Trait} from '../Entity';
import {Vec2} from '../math';
import {SoundBoard} from '../sounds/Sound';

/** Killable class for entities. */
export default class PlayerController extends Trait {
  /**
   * Sets the player environment.
   * @param {Number} time
   */
  constructor(time) {
    super('playerController');
    this.checkpoint = new Vec2(0, 0);
    this.player = null;
    this.time = time;
    this.hurry = false;
    this.score = 0;
    this.lives = 3;
    this.coins = 97;
  }

  /**
   * Sets the entity to the controller.
   * @param {Entity} entity
   */
  setPlayer(entity) {
    this.player = entity;

    this.player.stomper.onStomp = () => {
      this.score += 100;
    };
  }

  /**
   * Update the coin count.
   * @param {Number} coins
   * @param {Number} score
   */
  updateCoinCount(coins, score) {
    this.queue(() => {
      if (coins === 100) {
        this.coins = 0;
        this.lives += 1;
        SoundBoard.fx.get('1-up').play();
      } else {
        this.coins = coins;
      }
      this.score = score;
    });
  }

  /**
   * Removes the entity if it is dead.
   * @param {Entity} entity
   * @param {Number} deltaTime
   * @param {Level} level
   */
  update(entity, deltaTime, level) {
    if (!level.entities.has(this.player)) {
      this.player.killable.revive();
      this.player.pos.set(this.checkpoint.x, this.checkpoint.y);
      level.entities.add(this.player);
    } else {
      this.time -= deltaTime * 2;
    }
    if (Math.ceil(this.time) === 100 && !this.hurry) {
      this.hurry = true;
      SoundBoard[level.backgroundMusic].pause();
      SoundBoard.warning.play();
    }
    if (Math.ceil(this.time) === 0) {
      this.player.killable.kill();
      SoundBoard[level.backgroundMusic].sound.currentTime = 0;
      SoundBoard[level.backgroundMusic].sound.playbackRate = 1;
      this.time = 300;
      this.lives -= 1;
    }
  }
}
