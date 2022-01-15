import {
  createRectangle, degToRad, getCenter, isPointInRect, rotatePoint, rotateRect,
} from './geom';

describe('utils/geom', () => {
  describe('degToRad', () => {
    it('should return radians from given angle in degrees', () => {
      expect(degToRad(0)).toBe(0);
      expect(degToRad(45)).toBe(Math.PI / 4);
      expect(degToRad(90)).toBe(Math.PI / 2);
      expect(degToRad(180)).toBe(Math.PI);
      expect(degToRad(360)).toBe(2 * Math.PI);
    });
  });

  describe('getCenter', () => {
    it('should return center of given rectangle', () => {
      const rect = createRectangle({ x: 0, y: 0 }, 100, 100);

      expect(getCenter(rect)).toEqual({ x: 50, y: 50 });
    });
  });

  describe('rotatePoint', () => {
    it('should return a new point with rotated coordinates', () => {
      const point = { x: 0, y: 0 };
      const pivot = { x: 50, y: 50 };

      expect(rotatePoint(pivot, point, Math.PI / 2)).toEqual({ x: 100, y: -0 });
    });
  });

  describe('rotateRect', () => {
    it('should return all vertices with rotated coordinates, using center as pivot', () => {
      const rect = createRectangle({ x: 0, y: 0 }, 100, 100);

      expect(rotateRect(rect, Math.PI / 2)).toEqual([
        { x: 0, y: 0 },
        { x: 100, y: -0 },
        { x: 100, y: 100 },
        { x: 0, y: 100 },
      ]);
    });
  });

  describe('isPointInRect', () => {
    it.each([
      ['left-top corner', { x: 0, y: 0 }],
      ['right-top corner', { x: 100, y: 0 }],
      ['right-bottom corner', { x: 100, y: 100 }],
      ['left-bottom corner', { x: 0, y: 100 }],
      ['center', { x: 50, y: 50 }],
    ])('should return true when the %s is included in the rectangle', (_, point) => {
      const rect = createRectangle({ x: 0, y: 0 }, 100, 100);

      expect(isPointInRect(point, rect)).toBe(true);
    });

    it('should return false when a point is not included in the rectangle', () => {
      const rect = createRectangle({ x: 0, y: 0 }, 100, 100);

      expect(isPointInRect({ x: 0, y: 100.1 }, rect)).toBe(false);
    });
  });
});
