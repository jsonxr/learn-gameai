import { assert } from 'chai';
import StateMachine from '../src/StateMachine.js';
import Entity from '../src/Entity.js';
jest.mock('../src/StateMachine.js');
console.log = jest.fn();

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  StateMachine.mockClear();
});

describe('Entity', () => {
  describe('#constructor', () => {
    it('should have unique ids', () => {
      const e1 = new Entity();
      const e2 = new Entity();
      assert.notEqual(e1.id, e2.id);
    });
  });
  describe('#update()', () => {
    it('should call stateMachine update', () => {
      const e = new Entity();
      e.update();
      assert.equal(StateMachine.mock.instances[0].update.mock.calls.length, 1);      
    });
  });
  describe('#handleMessage', () => {
    it('should call stateMachine handleMessage', () => {
      StateMachine.mockImplementationOnce(() => {
        return {
          handleMessage: () => true
        }
      });

      const e = new Entity();
      const handled = e.handleMessage({});
      assert.isTrue(handled);
    });
  });
});
