import Point from './Point'

class FieldBase {
	cords: Point;
	constructor(cords: Point) {
		this.cords = cords;
	}
}

export default FieldBase;