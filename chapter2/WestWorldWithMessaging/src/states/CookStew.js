import dispatch from '../messaging/MessageDispatcher.js';
import State from '../State.js';
import MessageTypes from '../MessageTypes.js';
import DoHouseWork from './DoHouseWork.js';


class CookStew extends State {

  enter(obj) {
    if (!obj.isCooking) {
      dispatch.dispatchMessage(1500, obj, obj, MessageTypes.STEW_READY)
      obj.isCooking = true;
    }
  }
  execute(obj) {
    console.log(`${obj.constructor.name}: Fussin' over food`);
  }
  exit(obj) {
    console.log(`${obj.constructor.name}: Puttin' the stew on the table`);
  }
  onMessage(obj, msg) {
    switch (msg.msg) {
      case MessageTypes.STEW_READY:
        console.log(`${obj.constructor.name}: Stew ready! Let's eat`);
        dispatch.dispatchMessage(0, obj, obj.husband, MessageTypes.STEW_READY)
        obj.isCooking = false;
        obj.stateMachine.changeState(DoHouseWork);
        break;
    }
    return true;
  }

}
const state = new CookStew();

export {
  state as default,
  state as CookStew
}
