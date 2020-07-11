class Point {
	X: number;
	Y: number;

	constructor(X: number, Y: number) {
		this.X = X;
		this.Y = Y;
	}

	AddPoint(pnt: Point): Point {
		return new Point(pnt.X + this.X, pnt.Y + this.Y);
	}

	EqualTo(pnt: Point){
		return this.X === pnt.X && this.Y === pnt.Y
	}

	InsideBoundries(pnt: Point, X: number, Y: number): boolean {
		return pnt.X < X && pnt.X >= 0 && pnt.Y < Y && pnt.Y >= 0;
	}
}

export default Point;
