import 'source-map-support/register';
import Miner from './Miner.js';
import MinersWife from './MinersWife.js';
import dispatch from './messaging/MessageDispatcher.js';


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  const miner = new Miner();
  const wife = new MinersWife();
  miner.wife = wife;
  wife.husband = miner;
  
  for (let i = 0; i < 30; i++) {
    miner.update();
    wife.update();
    dispatch.dispatchDelayedMessages();
    await delay(500);
  }
  
}

main();