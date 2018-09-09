import dispatch from '../messaging/MessageDispatcher.js';
import State from '../State.js';
import MessageTypes from '../MessageTypes.js';
import DoHouseWork from './DoHouseWork.js';


class EatStew extends State {

  enter(obj) {
    console.log(`${obj.constructor.name}: Smells Reaaal goood Elsa!`);
  }
  execute(obj) {
    console.log(`${obj.constructor.name}: Tastes real good too!`);
    obj.stateMachine.revertToPreviousState();
  }
  exit(obj) {
    console.log(`${obj.constructor.name}: Thankya li'lle lady. Ah better get back to whatever ah wuz doin'`);
  }

}
const state = new EatStew();

export {
  state as default,
  state as EatStew
}
