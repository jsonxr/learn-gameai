import { assert } from 'chai';


class StateMachine {
  owner = null;
  currentState = null;
  previousState = null;
  globalState = null;

  constructor(owner) {
    this.owner = owner;
  }

  setCurrentState(state) {
    assert(state, 'state must be defined');
    this.currentState = state;
  }
  setGlobalState(state) {
    assert(state, 'state must be defined');
    this.globalState = state;
  }

  setPreviousState(state) {
    assert(state, 'state must be defined');
    this.previousState = state;
  }

  //call this to update the FSM
  update() {
    if (this.globalState) {
      this.globalState.execute(this.owner);
    }
    if (this.currentState) {
      this.currentState.execute(this.owner);
    }
  }

  //change to a new state
  changeState(state) {
    this.previousState = this.currentState;
    this.currentState.exit(this.owner);
    this.currentState = state;
    this.currentState.enter(this.owner);
  }

  revertToPreviousState() {
    assert(this.previousState);
    this.changeState(this.previousState);
  }

  //returns true if the current state's type is equal to the type of the
  //class passed as a parameter. 
  isInState(state) {
    assert(state.constructor);
    return (state.constructor === this.currentState.constructor);
  }

  handleMessage(telegram) {
    assert(telegram);

    //first see if the current state is valid and that it can handle
    //the message
    if (this.currentState && this.currentState.onMessage(this.owner, telegram)) {
      return true;
    }
    
    //if not, and if a global state has been implemented, send 
    //the message to the global state
    if (this.globalState && this.globalState.onMessage(this.owner, telegram)) {
      return true;
    }

    return false;
  }

}

export {
  StateMachine as default,
  StateMachine
}
