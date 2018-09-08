import 'source-map-support/register';
import Miner from './Miner.js';
import MinersWife from './MinersWife.js';

const miner = new Miner();
const wife = new MinersWife();

for (let i = 0; i < 31; i++) {
  miner.update();
  wife.update();
}
