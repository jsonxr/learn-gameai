import uuid from 'uuid/v4';
import StateMachine from './states/StateMachine.js';


class Entity {
  id = uuid();
  stateMachine = null;

  constructor() {
    this.stateMachine = new StateMachine(this);
  }

  update() {
    this.stateMachine.update();
  }
}


export default Entity;
