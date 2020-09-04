const { add, subtract } = require('./math');

describe('math', () => {
  it('can subtract numbers', () => {
    expect(subtract(3, 2)).toBe(1);
  });
  it('can add numbers', () => {
    expect(add(3, 2)).toBe(5);
  });
});
