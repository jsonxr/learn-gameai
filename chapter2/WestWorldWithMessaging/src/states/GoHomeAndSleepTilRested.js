import State from '../State.js';
import Locations from '../Locations.js';
import EnterMineAndDigForNugget from './EnterMineAndDigForNugget.js';
import dispatcher from '../messaging/MessageDispatcher.js';
import MessageTypes from '../MessageTypes.js';
import EatStew from '../states/EatStew.js';


class GoHomeAndSleepTilRested extends State {
  enter(obj) {
    if (obj.location !== Locations.SHACK) {
      console.log(`${obj.constructor.name}: Walkin' home`);
      obj.location = Locations.SHACK;
      dispatcher.dispatchMessage(0, obj, obj.wife, MessageTypes.HI_HONEY_IM_HOME);
    }
  }

  execute(obj) {
    //if miner is not fatigued start to dig for nuggets again.
    if (obj.fatigue <= 0) {
      console.log(`${obj.constructor.name}: What a Gosh darn fantastic nap! Time to find more gold`);
      obj.stateMachine.changeState(EnterMineAndDigForNugget);
    } else {
      obj.fatigue -= 1;
      console.log(`${obj.constructor.name}: ZZZZ...`);
    }
  }

  exit(obj) {
    console.log(`${obj.constructor.name}: Leaving the house`);
  }

  onMessage(obj, msg) {
    switch(msg.msg) {
      case MessageTypes.STEW_READY:
        console.log(`${obj.constructor.name}: Okay hun, ahm a-comin'!`);
        obj.stateMachine.changeState(EatStew);
        return true;
    }

    return false;
  }
}
const state = new GoHomeAndSleepTilRested();

export {
  state as default,
  state as GoHomeAndSleepTilRested
}
