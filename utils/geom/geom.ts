export interface Point {
  x: number,
  y: number
}

export interface Rectangle {
  x: number,
  y: number,
  left: number,
  top: number,
  bottom: number,
  right: number,
  width: number,
  height: number,
}

export type Vertices = [Point, Point, Point, Point];

export function createRectangle(leftTopCorner: Point, width: number, height: number): Rectangle {
  return {
    ...leftTopCorner,
    left: leftTopCorner.x,
    top: leftTopCorner.y,
    right: leftTopCorner.x + width,
    bottom: leftTopCorner.y + height,
    width,
    height,
  };
}

export function degToRad(degrees: number): number {
  return (degrees / 180) * Math.PI;
}

export function getCenter(rect: Rectangle): Point {
  return {
    x: rect.left + (rect.width / 2),
    y: rect.bottom - (rect.height / 2),
  };
}

export function rotatePoint(pivot: Point, point: Point, rad: number): Point {
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);

  return {
    x: Math.round(pivot.x + (cos * (point.x - pivot.x)) - (sin * (point.y - pivot.y))),
    y: Math.round(pivot.y + (sin * (point.x - pivot.x)) + (cos * (point.y - pivot.y))),
  };
}

export function rotateRect(rect: Rectangle, rad: number): Vertices {
  const center = getCenter(rect);

  return [
    rotatePoint(center, { x: rect.left, y: rect.bottom }, rad),
    rotatePoint(center, { x: rect.left, y: rect.top }, rad),
    rotatePoint(center, { x: rect.right, y: rect.top }, rad),
    rotatePoint(center, { x: rect.right, y: rect.bottom }, rad),
  ];
}

export function isPointInRect(point: Point, rect: Rectangle): boolean {
  return point.x >= rect.left && point.x <= rect.right
        && point.y >= rect.top && point.y <= rect.bottom;
}
