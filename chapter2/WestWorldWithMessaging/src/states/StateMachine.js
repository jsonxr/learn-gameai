class StateMachine {
  owner = null;
  currentState = null;
  previousState = null;
  globalState = null;

  constructor(owner) {
    this.owner = owner;
  }

  setCurrentState(state) {
    if (!state) {
      throw new Error('State can not be null');
    }
    this.currentState = state;
  }
  setGlobalState(state) {
    if (!state) {
      throw new Error('State can not be null');
    }
    this.globalState = state;
  }
  setPreviousState(state) {
    if (!state) {
      throw new Error('State can not be null');
    }
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
    this.changeState(this.previousState);
  }

  //returns true if the current state's type is equal to the type of the
  //class passed as a parameter. 
  isInState(state) {
    return (state.constructor.name === this.currentState.constructor.name);
  }

}

export default StateMachine;
