import TinyQueue from 'tinyqueue';
import { assert } from 'chai';
import Telegram from './Telegram.js';


class MessageDispatcher {
  tinyqueue = new TinyQueue([], (a,b) => a.dispatchTime - b.dispatchTime);

  discharge(receiver, telegram) {
    if (! receiver.handleMessage(telegram)) {
      console.warn('Message not handled');
    }
  }

  dispatchMessage(delay, sender, receiver, msg, extraInfo) {
    assert(sender);
    assert(receiver);
    assert(msg);
    const telegram = new Telegram({
      dispatchTime: 0,
      sender,
      receiver,
      msg,
      extraInfo
    });

    if (delay <= 0) {
      // Send immediately
      this.discharge(receiver, telegram);
    } else {
      // Queue for later
      telegram.dispatchTime = Date.now() + delay;
      this.tinyqueue.push(telegram);
    }
  }

  dispatchDelayedMessages() {
    const time = Date.now();
    while(
      this.tinyqueue.length > 0 &&
      this.tinyqueue.peek().dispatchTime < time &&
      this.tinyqueue.peek().dispatchTime > 0
    ) {
      const telegram = this.tinyqueue.pop();
      this.discharge(telegram.receiver, telegram);
    }
  }

  push(msg) {
    this.tinyqueue.push(msg);
  }
  pop() {
    return this.tinyqueue.pop();
  }
  peek() {
    return this.tinyqueue.peek();
  }
}

const dispatcher = new MessageDispatcher();

export {
  dispatcher as default,
  MessageDispatcher,
}
