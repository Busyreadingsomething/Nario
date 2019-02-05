import {Vec2} from './math';

/** Sets the sprite entity. */
export default class Entity {
  /** Sets the position and velocity. */
  constructor() {
    this.pos = new Vec2(0, 0);
    this.vel = new Vec2(0, 0);
  }
}
