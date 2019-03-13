import Entity, {Trait} from '../Entity';
import Killable from '../traits/Killable';
import {loadSpriteSheet} from '../loaders';
import Sound from '../sounds/Sound';

/** Goomba Behavior class. */
class Behavior extends Trait {
  /** Sets up the trait name. */
  constructor() {
    super('behavior');
  }

  /**
   * Activates behavior on collision.
   * @param {Entity} us
   * @param {Entity} them
   */
  collides(us, them) {
    debugger;
    if (!them.stomper) return;
    if (us.killable.dead) {
      us.grabCoin();
      return;
    }
    const newCoins = us.env.controller.coins + 1;
    const newScore = us.env.controller.score + 100;
    us.env.controller.updateCoinCount(newCoins, newScore);
    us.killable.kill();
  }
}

/**
 * Creates the goomba entity with the draw and update methods.
 * @return {Promise<Entity>} goomba entity
 */
export function loadCoin() {
  return loadSpriteSheet('coin').then(createCoinFactory);
}

/**
 * Generates the create Goomba Function.
 * @param {SpriteSheet} sprite
 * @return {Function} Creates coin function.
 */
function createCoinFactory(sprite) {
  console.log('Sprite', sprite);
  const shineAnim = sprite.animations.get('shine');

  /**
   * Routes the animation based on the scenario.
   * @param {Entity} coin
   * @return {Function} Animation for the coin.
   */
  function routeAnim(coin) {
    return shineAnim(coin.lifetime);
  }

  /**
   * @param {Canvas} context
   */
  function drawCoin(context) {
    sprite.draw(routeAnim(this), context, 8, 8);  // eslint-disable-line
  };


  return function createCoin() {
    const coin = new Entity(sprite.type);
    coin.size.set(16, 16);
    coin.offset.set(8, 8);

    coin.addTrait(new Behavior());
    coin.addTrait(new Killable(0));

    coin.fx = {
      ping: new Sound('../../sounds/coin.wav'),
    };

    /** Plays coin ping. */
    coin.grabCoin = () => {
      coin.fx.ping.sound.play();
    };
    coin.draw = drawCoin;

    return coin;
  };
}
