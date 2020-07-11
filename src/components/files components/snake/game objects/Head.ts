import Point from './Point'
import BodyPart from './BodyPart'

class Head extends BodyPart {
	direction: Point;
	angle: number = 0;
	constructor(direction: Point, cords: Point) {
		super(cords);
		this.direction = direction;
	}

	Move() {
		this.cords = this.cords.AddPoint(this.direction);
	}

	TurnLeft() {
		this.angle += 90;
		let angleRad = this.angle * (Math.PI / 180);

		this.direction = new Point(
			1 * Math.round(Math.cos(angleRad)),
			-1 * Math.round(Math.sin(angleRad))
		);
	}

	TurnRight() {
		this.angle -= 90;
		let angleRad = this.angle * (Math.PI / 180);

		this.direction = new Point(
			1 * Math.round(Math.cos(angleRad)),
			-1 * Math.round(Math.sin(angleRad))
		);
	}
}

export default Head;
