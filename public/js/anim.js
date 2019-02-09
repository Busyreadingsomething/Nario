/**
 * Creates the animation for the sprite.
 * @param {Array<String>} frames frames in the animation
 * @param {Number} frameLen Length of the frames
 * @return {Function} method to resolve the frames
 */
export function createAnim(frames, frameLen) {
  return function resolveFunc(distance) {
    const frameIndex = Math.floor(distance / frameLen) % frames.length;
    const frameName = frames[frameIndex];
    return frameName;
  };
}
