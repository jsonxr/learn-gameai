import State from './State.js';
import Locations from '../Locations.js';
import EnterMineAndDigForNugget from './EnterMineAndDigForNugget.js';


class QuenchThirst extends State {
  enter(obj) {
    if (obj.location !== Locations.SALOON) {
      console.log(`${obj.constructor.name}: Boy, ah sure is thusty! Walking to the saloon`);
      obj.location = Locations.SALOON;
    }
  }

  execute(obj) {
    if (obj.isThirsty()) {
      obj.buyAndDrinkAWhiskey();
      console.log(`${obj.constructor.name}: That's mighty fine sippin liquer`);
      obj.stateMachine.changeState(EnterMineAndDigForNugget);
    } else {
      console.log('\nERROR!\nERROR!\nERROR!');
    }
  }

  exit(obj) {
    console.log(`${obj.constructor.name}: Leaving the saloon, feelin' good`);
  }
}
const state = new QuenchThirst();

export {
  state as default,
  state as QuenchThirst
}
