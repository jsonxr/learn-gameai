import uuid from 'uuid/v4';
import StateMachine from './StateMachine.js';


class Entity {
  id = uuid();
  stateMachine = new StateMachine(this);

  update() {
    this.stateMachine.update();
  }

  handleMessage(telegram) {
    return this.stateMachine.handleMessage(telegram);
  }
}


export default Entity;
