import lerp from './lerp';

describe('utils/lerp', () => {
  it('should linear inerpolate between 2 values at given weight', () => {
    expect(lerp(0, 100, 0)).toBe(0);
    expect(lerp(0, 100, 0.25)).toBe(25);
    expect(lerp(0, 100, 0.5)).toBe(50);
    expect(lerp(0, 100, 0.75)).toBe(75);
    expect(lerp(0, 100, 1)).toBe(100);
  });

  it('should clamp weight between 0 and 1', () => {
    expect(lerp(0, 100, -0.01)).toBe(0);
    expect(lerp(0, 100, 1.01)).toBe(100);
  });
});
