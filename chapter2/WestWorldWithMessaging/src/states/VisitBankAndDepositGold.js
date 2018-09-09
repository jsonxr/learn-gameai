import State from '../State.js';
import Locations from '../Locations.js';
import GoHomeAndSleepTilRested from './GoHomeAndSleepTilRested.js';
import EnterMineAndDigForNugget from './EnterMineAndDigForNugget.js';
import { COMFORT_LEVEL } from './constants.js';


class VisitBankAndDepositGold extends State {
  enter(obj) {
    if (obj.location !== Locations.BANK) {
      console.log(`${obj.constructor.name}: Goin' to the bank. Yes siree`);
      obj.location = Locations.BANK;
    }
  }

  execute(obj) {

    //deposit the gold
    obj.moneyInBank += obj.gold;
    obj.gold = 0;

    console.log(`${obj.constructor.name}: Depositing gold. Total savings now: ${obj.moneyInBank}`);

    if (obj.moneyInBank >= COMFORT_LEVEL) {
      //wealthy enough to have a well earned rest
      console.log(`${obj.constructor.name}: WooHoo! Rich enough for now. Back home to mah li'lle lady`);
      obj.stateMachine.changeState(GoHomeAndSleepTilRested)
    } else {
      //otherwise get more gold
      obj.stateMachine.changeState(EnterMineAndDigForNugget);
    }
  }

  exit(obj) {
    console.log(`${obj.constructor.name}: Leavin' the bank`);
  }
}
const state = new VisitBankAndDepositGold();

export {
  state as default,
  state as VisitBankAndDepositGold
}
