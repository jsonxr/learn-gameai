import { MessageDispatcher } from '../../src/messaging/MessageDispatcher.js';
import { assert } from 'chai';


const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

describe('MessageDispatcher', () => {
  describe('#pop', () => {
    it('should pop elements in order of dispatchTime', () => {
      const dispatcher = new MessageDispatcher();
      dispatcher.push({ id: 7, dispatchTime: 7 });
      dispatcher.push({ id: 5, dispatchTime: 5 });
      dispatcher.push({ id: 10, dispatchTime: 10 });
      const item = dispatcher.pop();
      assert.equal(item.id, 5);
    });
  });
  describe('#peek', () => {
    it('should peek an element in order of dispatchTime', () => {
      const dispatcher = new MessageDispatcher();
      dispatcher.push({ id: 7, dispatchTime: 7 });
      dispatcher.push({ id: 5, dispatchTime: 5 });
      dispatcher.push({ id: 10, dispatchTime: 10 });
      const item1 = dispatcher.peek();
      assert.equal(item1.id, 5);
      const item2 = dispatcher.pop();
      assert.equal(item2.id, 5);
    });
  });

  describe('#discharge', () => {
    it('should warn if receiver didn\t handle', () => {
      const dispatcher = new MessageDispatcher();
      const receiver = {
        handleMessage: jest.fn().mockReturnValue(false)
      }
      console.warn = jest.fn();
      dispatcher.dispatchMessage(0, {}, receiver, { hello: 'world' }, { extra: 'info'});
      assert.equal(console.warn.mock.calls.length, 1);
      assert.equal(receiver.handleMessage.mock.calls[0][0].msg.hello, 'world');
      assert.equal(receiver.handleMessage.mock.calls[0][0].extraInfo.extra, 'info');
    })
  });

  describe('#dispatchMessage', () => {
    it('should dispatch message immediately with delay = 0', () => {
      const dispatcher = new MessageDispatcher();
      const receiver = {
        handleMessage: jest.fn().mockReturnValue(true)
      }
      dispatcher.dispatchMessage(0, {}, receiver, { hello: 'world' }, { extra: 'info'});
      dispatcher.dispatchMessage(1000, {}, receiver, { hello: 'world2' }, { extra: 'info2'});
      assert.equal(receiver.handleMessage.mock.calls.length, 1);
      assert.equal(receiver.handleMessage.mock.calls[0][0].msg.hello, 'world');
      assert.equal(receiver.handleMessage.mock.calls[0][0].extraInfo.extra, 'info');
    });
    it('should dispatch messages later with delay > 0', async () => {
      const dispatcher = new MessageDispatcher();
      const receiver = {
        handleMessage: jest.fn().mockReturnValue(true)
      }
      dispatcher.dispatchMessage(1, {}, receiver, { hello: 'world1' }, { extra: 'info1'});
      dispatcher.dispatchMessage(2, {}, receiver, { hello: 'world2' }, { extra: 'info2'});
      dispatcher.dispatchMessage(1000, {}, receiver, { hello: 'world3' }, { extra: 'info3'});
      assert.equal(receiver.handleMessage.mock.calls.length, 0);
      await delay(10);
      dispatcher.dispatchDelayedMessages();
      assert.equal(receiver.handleMessage.mock.calls.length, 2);
      const telegramCalls = receiver.handleMessage.mock.calls;
      assert.equal(telegramCalls[0][0].msg.hello, 'world1');
      assert.equal(telegramCalls[0][0].extraInfo.extra, 'info1');
      assert.equal(telegramCalls[1][0].msg.hello, 'world2');
      assert.equal(telegramCalls[1][0].extraInfo.extra, 'info2');
    });
  });
});
