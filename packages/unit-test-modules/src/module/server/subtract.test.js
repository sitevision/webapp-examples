const { subtract } = require('./subtract');

describe('subtract', () => {
  it('can subtract numbers', () => {
    expect(subtract(3, 2)).toBe(1);
  });
});
