import State from '../State.js';
import Locations from '../Locations.js';
import QuenchThirst from './QuenchThirst.js';
import VisitBankAndDepositGold from './VisitBankAndDepositGold.js';


class EnterMineAndDigForNugget extends State {
  enter(obj) {
    if (obj.location !== Locations.GOLDMINE) {
      console.log(`${obj.constructor.name}: Walkin' to the goldmine.`)
      obj.location = Locations.GOLDMINE;
    }
  }

  execute(obj) {
    //the miner digs for gold until he is carrying in excess of MaxNuggets. 
    //If he gets thirsty during his digging he packs up work for a while and 
    //changes state to go to the saloon for a whiskey.
    obj.gold++;
    obj.fatigue++;
    obj.thirst++;

    console.log(`${obj.constructor.name}: Pickin' up a nugget`);

    if (obj.arePocketsFull()) {
      obj.stateMachine.changeState(VisitBankAndDepositGold);
    } else if (obj.isThirsty()) {
      obj.stateMachine.changeState(QuenchThirst);
    }
  }

  exit(obj) {
    console.log(`${obj.constructor.name}: Ah'm leavin' the goldmine with mah pockets full o' sweet gold`);
  }
}
const state = new EnterMineAndDigForNugget();


export {
  state as default,
  state as EnterMineAndDigForNugget
}
