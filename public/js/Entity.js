import {Vec2} from './math';
import BoundingBox from './BoundingBox';

export const Sides = {
  TOP: Symbol('top'),
  BOTTOM: Symbol('bottom'),
  LEFT: Symbol('left'),
  RIGHT: Symbol('right'),
};

/** Trait base calss */
export class Trait {
  /**
   * Sets the trait name.
   * @param {String} name of trait
   */
  constructor(name) {
    this.name = name;
  }

  /**
   * Base collides method.
   * @param {Entity} us
   * @param {Entity} them
   */
  collides(us, them) {}

  /** Base obstruct method. */
  obstruct() {}

  /** Base update method. */
  update() {}
}
/** Sets the sprite entity. */
export default class Entity {
  /** Sets the position and velocity. */
  constructor() {
    this.canCollide = true;
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
    this.size = new Vec2(0, 0);
    this.offset = new Vec2(0, 0);
    this.bounds = new BoundingBox(this.pos, this.size, this.offset);
    this.lifetime = 0;
    this.traits = [];
  }

  /**
   * Adds trait to the traits array.
   * @param {Trait} trait The trait to be added.
   */
  addTrait(trait) {
    this.traits.push(trait);
    this[trait.name] = trait;
  }

  /**
   * Passes the side to the traits' obstruct method.
   * @param {Entity} candidate location of obstruction
   */
  collides(candidate) {
    this.traits.forEach((trait) => trait.collides(this, candidate));
  }

  /**
   * Passes the side to the traits' obstruct method.
   * @param {String} side location of obstruction
   */
  obstruct(side) {
    this.traits.forEach((trait) => trait.obstruct(this, side));
  }

  /** Empty draw function. */
  draw() {}

  /**
   * Updates all traits with the time.
   * @param {Number} deltaTime Time to pass for update
   * @param {Level} level
   */
  update(deltaTime, level) {
    this.traits.forEach((trait) => trait.update(this, deltaTime, level));
    this.lifetime += deltaTime;
  }
}
