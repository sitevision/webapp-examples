const { add } = require('./add');

describe('simple-module', () => {
  it('can add numbers', () => {
    expect(add(1, 3)).toBe(4);
  });
});
