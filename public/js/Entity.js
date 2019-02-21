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

  /** Base obstruct method. */
  obstruct() {}

  /** Base update method. */
  update() {
    console.warn('Unhandled update call in Trait');
  }
}
/** Sets the sprite entity. */
export default class Entity {
  /** Sets the position and velocity. */
  constructor() {
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
   * @param {String} side location of obstruction
   */
  obstruct(side) {
    this.traits.forEach((trait) => trait.obstruct(this, side));
  }
  /**
   * Updates all traits with the time.
   * @param {Number} deltaTime Time to pass for update
   */
  update(deltaTime) {
    this.traits.forEach((trait) => trait.update(this, deltaTime));
    this.lifetime += deltaTime;
  }
}
