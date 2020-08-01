export default interface Point {
    X: number;
    Y: number;
}

export function AddPoints(point1: Point, point2: Point): Point {
    return {
        X: point1.X + point2.X,
        Y: point1.Y + point2.Y,
    };
}

export function PointsEqual(point1: Point, point2: Point): boolean {
    return point1.X === point2.X && point1.Y === point2.Y;
}

export function RandomPoint(rangeFrom: Point, rangeTo: Point): Point {
    let x = Math.round(Math.random() * (rangeTo.X - rangeFrom.X) + rangeFrom.X);
    let y = Math.round(Math.random() * (rangeTo.Y - rangeFrom.Y) + rangeFrom.Y);
    return {
        X: x,
        Y: y,
    };
}
