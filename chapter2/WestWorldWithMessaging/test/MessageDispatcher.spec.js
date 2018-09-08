import MessageDispatcher from '../src/MessageDispatcher.js';
import { assert } from 'chai';


describe('MessageDispatcher.js', () => {
  it('should pop elements in order of deliveryTime', () => {
    const dispatcher = new MessageDispatcher();
    dispatcher.push({ id: 7, deliveryTime: 7 });
    dispatcher.push({ id: 5, deliveryTime: 5 });
    dispatcher.push({ id: 10, deliveryTime: 10 });
    const item = dispatcher.pop();

    assert.equal(item.id, 5);
  });
  it('should peek an element in order of deliveryTime', () => {
    const dispatcher = new MessageDispatcher();
    dispatcher.push({ id: 7, deliveryTime: 7 });
    dispatcher.push({ id: 5, deliveryTime: 5 });
    dispatcher.push({ id: 10, deliveryTime: 10 });
    const item1 = dispatcher.peek();
    assert.equal(item1.id, 5);
    const item2 = dispatcher.pop();
    assert.equal(item2.id, 5);
  });
});
