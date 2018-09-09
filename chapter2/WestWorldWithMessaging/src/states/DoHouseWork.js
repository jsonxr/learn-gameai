import State from '../State.js';


class DoHouseWork extends State {

  execute(obj) {
    switch (Math.floor(Math.random() * Math.floor(2))) {
      case 0:
        console.log(`${obj.constructor.name}: Moppin' the floor`);
        break;
      case 1:
        console.log(`${obj.constructor.name}: Washin' the dishes`);
        break;
      case 2:
        console.log(`${obj.constructor.name}: Makin' the bed`);
        break;
    }
  }

}
const state = new DoHouseWork();

export {
  state as default,
  state as DoHouseWork
}
