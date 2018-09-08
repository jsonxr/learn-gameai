import State from './State.js';
import VisitBathroom from './VisitBathroom.js';


class WifesGlobalState extends State {
  execute(obj) {
    // 1 in 10 chance of needing the bathroom
    if (Math.random() < 0.1) {
      obj.stateMachine.changeState(VisitBathroom);
    }
  }
}
const state = new WifesGlobalState();

export {
  state as default,
  state as WifesGlobalState
}
