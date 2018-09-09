import { assert } from 'chai';
import State from '../src/State.js';


describe('State', () => {
  describe('#execute', () => {
    it('should exist', () => {
      const state = new State();
      state.execute();
    });
  });
  describe('#enter', () => {
    it('should exist', () => {
      const state = new State();
      state.enter();
    });
  });
  describe('#exit', () => {
    it('should exist', () => {
      const state = new State();
      state.exit();
    });
  });
  describe('#onMessage', () => {
    it('should exist', () => {
      const state = new State();
      state.onMessage();
    });
  })
});
