import Entity from './Entity.js';
import { GoHomeAndSleepTilRested } from './states/index.js';
import Locations from './Locations.js';
import { MAX_NUGGETS, THIRST_LEVEL, TIREDNESS_THRESHOLD } from './states/constants.js';


class Miner extends Entity {
  location = Locations.SHACK;
  gold = 0;
  moneyInBank = 0;
  thirst = 0;
  fatigue = 0;

  constructor() {
    super();
    this.stateMachine.setCurrentState(GoHomeAndSleepTilRested);
    console.log(this.stateMachine);
  }

  buyAndDrinkAWhiskey() {
    this.thirst = 0;
    this.moneyInBank -= 2;
  }

  arePocketsFull() {
    return this.gold > MAX_NUGGETS;
  }


  isThirsty() {
    return this.thirst > THIRST_LEVEL;
  }

  isFatigued() {
    return this.fatigue > TIREDNESS_THRESHOLD;
  }
}

export default Miner;
