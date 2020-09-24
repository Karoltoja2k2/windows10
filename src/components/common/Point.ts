export default interface IPoint {
    X: number;
    Y: number;
}

export const Point0 = Point(0, 0);

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

export function SubtractPoints(
    pointSubtractFrom: IPoint,
    pointToSubtract: IPoint
): IPoint {
    return {
        X: pointSubtractFrom.X - pointToSubtract.X,
        Y: pointSubtractFrom.Y - pointToSubtract.Y,
    };
}

export function Scalar(scalar: number, point: IPoint): IPoint {
    return Point(scalar * point.X, scalar * point.Y);
}

export function PointsEqual(point1: IPoint, point2: IPoint): boolean {
    return point1.X === point2.X && point1.Y === point2.Y;
}

export function PointBetweenPoints(point: IPoint, pointFrom: IPoint, pointTo: IPoint) : boolean {
    return InRange(point.X, pointFrom.X, pointTo.X) && InRange(point.Y, pointFrom.Y, pointTo.Y);
}

export function RandomPoint(rangeFrom: IPoint, rangeTo: IPoint): IPoint {
    let x = Math.round(Math.random() * (rangeTo.X - rangeFrom.X) + rangeFrom.X);
    let y = Math.round(Math.random() * (rangeTo.Y - rangeFrom.Y) + rangeFrom.Y);
    return {
        X: x,
        Y: y,
    };
}

export function InRange(x: number, min: number, max: number) {
    return ((x-min)*(x-max) <= 0);
}


// export function InRange(range: number, rangeFrom: number, rangeTo: number) {
//     return range >= rangeFrom && range <= rangeTo;
// }

export function Distance(pointFrom: IPoint, pointTo: IPoint): number {
    return Math.sqrt(
        Math.pow(pointFrom.X - pointTo.X, 2) +
            Math.pow(pointFrom.Y - pointTo.Y, 2)
    );
}

export function Vector(pointFrom: IPoint, pointTo: IPoint): IPoint {
    return {
        X: pointTo.X - pointFrom.X,
        Y: pointTo.Y - pointFrom.Y,
    };
}

export function VectorLen(vector: IPoint): number {
    return Math.sqrt(Math.pow(vector.X, 2) + Math.pow(vector.Y, 2));
}

export function NormalizeVector(vector: IPoint, vectorLen: number): IPoint {
    return {
        X: vector.X / vectorLen,
        Y: vector.Y / vectorLen,
    };
}

export function ReverseVector(vector: IPoint): IPoint {
    return {
        X: vector.X * -1,
        Y: vector.Y * -1,
    };
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
