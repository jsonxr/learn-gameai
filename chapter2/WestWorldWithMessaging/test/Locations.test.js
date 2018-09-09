import Locations from '../src/Locations.js';
import { assert } from 'chai';


describe('Locations', () => {
  it('should have a SHACK', () => {
    assert(Locations.SHACK);
  });
  it('should not allow values to be added at runtime', () => {
    assert.throws(() => {
      Locations.NEW_VALUE = 'hi';
    });
  });
});
