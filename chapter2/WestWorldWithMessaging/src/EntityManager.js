import { assert } from 'chai';


class EntityManager {
  map = new Map();

  set(id, entity) {
    assert(id, 'id must be defined');
    assert(entity, 'entity must be defined');
    if (this.map.has(id)) {
      throw new Error('Duplicate identifier');
    }
    this.map.set(id, entity);
  }
  get(id) {
    assert(id, 'id must be defined');
    const obj = this.map.get(id);
    if (!obj) {
      throw new Error(`id does not exist: "${id}"`);
    }
    return obj;
  }
  has(id) {
    assert(id, 'id must be defined');
    return this.map.has(id);
  }
  delete(id) {
    assert(id, 'id must be defined');
    const exists = this.map.delete(id);
    if (!exists) {
      throw new Error(`id does not exist: "${id}"`);
    }
  }
}

const instance = new EntityManager();

export {
  instance as default,
  EntityManager,
}
