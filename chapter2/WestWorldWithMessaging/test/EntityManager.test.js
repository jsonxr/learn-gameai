import { EntityManager } from '../src/EntityManager.js';
import { assert } from 'chai';


describe('EntityManager', () => {

  describe('#set', () => {
    it('should allow adding entries', () => {
      const entityManager = new EntityManager();
      entityManager.set(1, { id: 1 });
    });
    it('should throw an error if id not provided', () => {
      const entityManager = new EntityManager();
      assert.throws(() => {
        entityManager.set();
      })
    });
    it('should throw an error if entity not provided', () => {
      const entityManager = new EntityManager();
      assert.throws(() => {
        entityManager.set(1);
      })
    });
    it('should throw error if adding duplicate entries', () => {
      const entityManager = new EntityManager();
      entityManager.set(1, { id: 1 });
      assert.throws(() => {
        entityManager.set(1, { id: 2 });
      });
    });
  });

  describe('#get', () => {
    it('should throw error if element at id does not exist', () => {
      const entityManager = new EntityManager();
      const e1 = { id: 1 };
      entityManager.set(1, e1);
      assert.throws(() => {
        entityManager.get(3);
      })
    });
    it('should have allow retrieval by id', () => {
      const entityManager = new EntityManager();
      const e1 = { id: 1 };
      entityManager.set(1, e1);
      entityManager.set(2, { id: 2 } );
      assert.deepEqual(entityManager.get(1), e1);
    });
  });

  describe('#has', () => {
    it('should return true if it has an element', () => {
      const entityManager = new EntityManager();
      entityManager.set(1, { id: 1 } );
      entityManager.set(2, { id: 2 } );
      assert.equal(entityManager.has(1), true);
    });
    it('should return false if it doesn\'t have an element', () => {
      const entityManager = new EntityManager();
      entityManager.set(1, { id: 1 } );
      entityManager.set(2, { id: 2 } );
      assert.equal(entityManager.has(3), false);
    });
  });
  describe('#delete', () => {
    it('should delete entries', () => {
      const entityManager = new EntityManager();
      entityManager.set(1, { id: 1 } );
      assert.equal(entityManager.has(1), true);
      entityManager.delete(1);
      //assert.equal(entityManager.has(1), false);
    });
    it('should throw error if id does not exist', () => {
      const entityManager = new EntityManager();
      entityManager.set(1, { id: 1 } );
      assert.throws(() => {
        entityManager.delete(2);
      });
    })
  });

});
