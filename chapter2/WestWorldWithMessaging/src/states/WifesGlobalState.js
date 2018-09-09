import State from '../State.js';
import VisitBathroom from './VisitBathroom.js';
import MessageTypes from '../MessageTypes.js';
import CookStew from '../states/CookStew.js';


class WifesGlobalState extends State {
  execute(obj) {
    // 1 in 10 chance of needing the bathroom
    if (Math.random() < 0.1) {
      obj.stateMachine.changeState(VisitBathroom);
    }
  }
  onMessage(obj, msg) {
    switch (msg.msg) {
      case MessageTypes.HI_HONEY_IM_HOME:
        console.log(`${obj.constructor.name}: Hi honey. Let me make you some of mah fine country stew`);
        obj.stateMachine.changeState(CookStew);
        break;
    }

    return true;
  }
}
const state = new WifesGlobalState();

export {
  state as default,
  state as WifesGlobalState
}
