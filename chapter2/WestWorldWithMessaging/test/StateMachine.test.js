import StateMachine from '../src/StateMachine.js';
import { assert } from 'chai';

import State from '../src/State.js';
jest.mock('../src/State.js');


describe('StateMachine', () => {
  describe('#constructor', () => {
    it('should create', () => {
      new StateMachine({});
    });
    it('should create if owner is not provided', () => {
      new StateMachine();
    })
  });

  describe('#setCurrentState', () => {
    it('should allow us to set current state', () => {
      const stateMachine = new StateMachine();
      const state = {};
      stateMachine.setCurrentState(state);
    })
    it('should throw an error when empty state is passed in.', () => {
      const stateMachine = new StateMachine();
      assert.throws(() => {
        stateMachine.setCurrentState();
      });
    });
  });

  describe('#setGlobalState', () => {
    it('should allow us to set current state', () => {
      const stateMachine = new StateMachine();
      const state = {};
      stateMachine.setGlobalState(state);
    })
    it('should throw an error when empty state is passed in.', () => {
      const stateMachine = new StateMachine();
      assert.throws(() => {
        stateMachine.setGlobalState();
      });
    });
  });

  describe('#setPreviousState', () => {
    it('should allow us to set current state', () => {
      const stateMachine = new StateMachine();
      const state = {};
      stateMachine.setPreviousState(state);
    })
    it('should throw an error when empty state is passed in.', () => {
      const stateMachine = new StateMachine();
      assert.throws(() => {
        stateMachine.setPreviousState();
      });
    });
  });

  describe('#update', () => {
    it('should call execute on global state if there is one', () => {
      const stateMachine = new StateMachine();
      const state = { execute: () => { state.called = 'yes';} };
      stateMachine.setGlobalState(state);
      stateMachine.update();
      assert.equal(state.called, 'yes');
    });
    it('should call execute on current state if there is one', () => {
      const stateMachine = new StateMachine();
      const state = { execute: () => { state.called = 'yes';} };
      stateMachine.setCurrentState(state);
      stateMachine.update();
      assert.equal(state.called, 'yes');
    });
  });

  describe('#changeState', () => {
    it('should save the previous state correctly', () => {
      const stateMachine = new StateMachine();
      const oldState = new State();
      const newState = new State();
      stateMachine.setCurrentState(oldState);
      stateMachine.changeState(newState);
      assert.equal(stateMachine.previousState, oldState);
    });

    it('should call exit on the old state', () => {
      const stateMachine = new StateMachine();
      const oldState = new State();
      const newState = new State();
      stateMachine.setCurrentState(oldState);
      stateMachine.changeState(newState);
      assert.equal(oldState.exit.mock.calls.length, 1);
    });

    it('should call enter on the new state', () => {
      const stateMachine = new StateMachine();
      const oldState = new State();
      const newState = new State();
      stateMachine.setCurrentState(oldState);
      stateMachine.changeState(newState);
      assert.equal(newState.enter.mock.calls.length, 1);
    });

    it('should set the current state properly', () => {
      const stateMachine = new StateMachine();
      const oldState = new State();
      const newState = new State();
      stateMachine.setCurrentState(oldState);
      stateMachine.changeState(newState);
      assert.equal(stateMachine.currentState, newState);
    });

  });

  describe('#revertToPreviousState', () => {
    it('should revert to previous state when called', () => {
      const stateMachine = new StateMachine();
      const oldState = new State();
      const newState = new State();
      stateMachine.setPreviousState(oldState);
      stateMachine.setCurrentState(newState);
      stateMachine.revertToPreviousState();
      assert.equal(stateMachine.currentState, oldState);
    });
    it('should throw an error when previous state is null', () => {
      const stateMachine = new StateMachine();
      const newState = new State();
      stateMachine.setCurrentState(newState);
      assert.throws(() => {
        stateMachine.revertToPreviousState();
      });
    });
  });

  describe('#handleMessage', () => {
    it('should return false if current state exists but doesn\'t handle it', () => {
      const stateMachine = new StateMachine();
      const state = new State();
      stateMachine.setCurrentState(state);
      const handled = stateMachine.handleMessage({});
      assert.equal(state.onMessage.mock.calls.length, 1);
      assert.equal(handled, false);
    });
    it('should return true if current state exists and handles it', () => {
      State.mockImplementationOnce(() => {
        return {
          onMessage: () => true
        }
      });
      const stateMachine = new StateMachine();
      const state = new State();
      stateMachine.setCurrentState(state);
      const handled = stateMachine.handleMessage({});
      assert.equal(handled, true);
    });
    it('should return false if global state exists but doesn\'t handle it', () => {
      const stateMachine = new StateMachine();
      const state = new State();
      stateMachine.setGlobalState(state);
      const handled = stateMachine.handleMessage({});
      assert.equal(state.onMessage.mock.calls.length, 1);
      assert.equal(handled, false);
    });
    it('should return true if current state exists and handles it', () => {
      State.mockImplementationOnce(() => {
        return {
          onMessage: () => true
        }
      });
      const stateMachine = new StateMachine();
      const state = new State();
      stateMachine.setGlobalState(state);
      const handled = stateMachine.handleMessage({});
      assert.equal(handled, true);
    });
  });

  describe('#isInState', () => {
    it('should return true if it is in the state', () => {
      const stateMachine = new StateMachine();
      const state = new State();
      stateMachine.setCurrentState(state);
      assert.equal(stateMachine.isInState(state), true);
    });
    it('should return false if it is not in the state', () => {
      const stateMachine = new StateMachine();
      class State1 extends State {};
      class State2 extends State {};
      const newState = new State1();
      const diffState = new State2();
      stateMachine.setCurrentState(newState);
      assert.equal(stateMachine.isInState(diffState), false);
    });
  });
});