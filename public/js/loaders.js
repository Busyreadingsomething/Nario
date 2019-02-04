/**
 * Loads the image of the on the load event
 * @param {string} url file path of the image
 * @return {Promise} image being loaded and event listener being added
 */
export function loadImage(url) {
  return new Promise((resolve) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.src = url;
  });
}
/**
 * Loads the level.
 * @param {string} name the name of the level to be loaded
 * @return {Promise}Json file of the level
 */
export function loadLevel(name) {
  return fetch(`/levels/${name}.json`)
      .then((r) => r.json());
}
