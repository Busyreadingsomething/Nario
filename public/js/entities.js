import {loadMario} from './entities/Mario';
import {loadGoomba} from './entities/Goomba';
import {loadKoopa} from './entities/Koopa';
import {loadCoin} from './entities/coin';

/**
 * Loads all the entities.
 * @return {Promise<Object<String, Function>>} Promise of all factories.
 */
export function loadEntities() {
  const entityFactories = {};

  /**
   * Adds factory method to the entityFactories.
   * @param {String} name Entity name.
   * @return {Function} Updates entity factories with factory method.
   */
  function addAs(name) {
    return (factory) => entityFactories[name] = factory;
  }

  return Promise.all([
    loadMario().then(addAs('mario')),
    loadGoomba().then(addAs('goomba')),
    loadKoopa().then(addAs('koopa')),
    loadCoin().then(addAs('coin')),
  ]).then(() => entityFactories);
}
