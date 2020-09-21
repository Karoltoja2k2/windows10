export default interface IPoint {
    X: number;
    Y: number;
}

export function Point(X: number, Y: number): IPoint {
    return {
        X,
        Y,
    };
}

export function AddPoints(point1: IPoint, point2: IPoint): IPoint {
    return {
        X: point1.X + point2.X,
        Y: point1.Y + point2.Y,
    };
}

export function Scalar(scalar: number, point: IPoint) : IPoint {
    return Point(scalar * point.X, scalar * point.Y)
}

export function PointsEqual(point1: IPoint, point2: IPoint): boolean {
    return point1.X === point2.X && point1.Y === point2.Y;
}

export function RandomPoint(rangeFrom: IPoint, rangeTo: IPoint): IPoint {
    let x = Math.round(Math.random() * (rangeTo.X - rangeFrom.X) + rangeFrom.X);
    let y = Math.round(Math.random() * (rangeTo.Y - rangeFrom.Y) + rangeFrom.Y);
    return {
        X: x,
        Y: y,
    };
}

export function InRange(range: number, rangeFrom: number, rangeTo: number){
    return range >= rangeFrom && range <= rangeTo;
}

export function Distance(pointFrom: IPoint, pointTo: IPoint): number {
    return Math.sqrt(
        Math.pow(pointFrom.X - pointTo.X, 2) +
            Math.pow(pointFrom.Y - pointTo.Y, 2)
    );
}

/** Calculates angle in deg between line and positive X axis */
export function LineAngle(point1: IPoint, point2: IPoint): number {
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
