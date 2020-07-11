import Point from './Point'
import FieldBase from './FieldBase'

class BodyPart extends FieldBase {
	nextBody?: BodyPart;

	constructor(cords: Point, nextBody?: BodyPart) {
		super(cords);
		this.nextBody = nextBody;
	}
}

export default BodyPart;