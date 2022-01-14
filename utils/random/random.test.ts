import { randomBetween, randomSort } from './random';

describe('utils/random', () => {
  describe('randomSort', () => {
    it('should return a new array with items randomly sorted', () => {
      const input = [1, 2, 3];
      const output = randomSort(input);

      expect(input).toEqual([1, 2, 3]);
      expect(output).not.toBe(input);
      input.forEach((element) => {
        expect(output).toContain(element);
      });
    });
  });

  describe('randomBetween', () => {
    it('should return a random number in the given range', () => {
      const actual = randomBetween(1, 100);

      expect(actual).toBeGreaterThanOrEqual(1);
      expect(actual).toBeLessThanOrEqual(100);
    });
  });
});
