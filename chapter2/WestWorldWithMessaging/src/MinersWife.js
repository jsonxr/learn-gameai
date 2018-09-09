import Entity from './Entity.js';
import { DoHouseWork, WifesGlobalState } from './states/index.js';


class MinersWife extends Entity {
  constructor() {
    super();
    this.stateMachine.setCurrentState(DoHouseWork);
    this.stateMachine.setGlobalState(WifesGlobalState);
  }
}

export {
  MinersWife as default,
  MinersWife
}
