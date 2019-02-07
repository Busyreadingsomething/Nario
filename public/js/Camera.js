import {Vec2} from './math';

/** Camera for the game. */
export default class Camera {
  /** Sets the position */
  constructor() {
    this.pos = new Vec2(0, 0);
    this.size = new Vec2(256, 224);
  }
}
