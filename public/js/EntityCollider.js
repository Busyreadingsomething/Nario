
/** Collider for entities. */
export default class EntityCollider {
  /**
   * Sets the array of entities.
   * @param {Array<Entity>} entities
   */
  constructor(entities) {
    this.entities = entities;
  }

  /**
   * Checkes the subject.
   * @param {Entity} subject
   */
  check(subject) {
    this.entities.forEach((candidate) => {
      if (subject === candidate) return;

      if (subject.bounds.overlaps(candidate.bounds)) {
        subject.collides(candidate);
        candidate.collides(subject);
      }
    });
  }
}
