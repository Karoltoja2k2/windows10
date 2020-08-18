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

export function PointsDistane(pointFrom: Point, pointTo: Point): number {
    return Math.sqrt(
        Math.pow(pointFrom.X - pointTo.X, 2) +
            Math.pow(pointFrom.Y - pointTo.Y, 2)
    );
}

/** Calculates angle in deg between line and positive X axis */
export function LineAngle(point1: Point, point2: Point): number {
    let dx = point1.X - point2.X;
    let dy = point1.Y - point2.Y;
    let slope = dy / dx;

    let angle = Math.atan(slope);
    return RadToDeg(angle);
}

export function RadToDeg(deg: number): number {
    return deg * (180 / Math.PI);
}

export function DegToRad(rad: number): number {
    return rad * (Math.PI / 180);
}
