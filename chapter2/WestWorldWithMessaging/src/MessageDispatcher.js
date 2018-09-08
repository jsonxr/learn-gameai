import TinyQueue from 'tinyqueue';


class MessageDispatcher {
  tinyqueue = new TinyQueue([], (a,b) => a.deliveryTime - b.deliveryTime);
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

export default MessageDispatcher;
