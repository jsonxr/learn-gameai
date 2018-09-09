import State from '../State.js';


class VisitBathroom extends State {
  enter(obj) {
    console.log(`${obj.constructor.name}: Walkin' to the can. Need to powda mah pretty li'lle nose`);
  }

  
  execute(obj) {
    console.log(`${obj.constructor.name}: Ahhhhhh! Sweet relief!`);
    obj.stateMachine.revertToPreviousState();
  }

  exit(obj) {
    console.log(`${obj.constructor.name}: Leavin' the Jon`);
  }
}
const state = new VisitBathroom();

export {
  state as default,
  state as VisitBathroom
}
