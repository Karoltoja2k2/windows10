import Point from "./Point";
import Head from "./Head";
import BodyPart from "./BodyPart";

const SnakeObject = () => {
	let head = new Head(new Point(1, 0), new Point(10, 10));

	let body1 = new BodyPart(new Point(9, 10), head);
	let body2 = new BodyPart(new Point(8, 10), body1);
	let body3 = new BodyPart(new Point(7, 10), body2);
	let body = [body1, body2, body3];

	let tail = new BodyPart(new Point(6, 10), body3);

	return { head: head, body: body, tail: tail };
};

// class SnakeObject {
//     head: Head;
//     body: BodyPart[];
//     tail: BodyPart;

//     constructor(){
//         this.head = new Head(new Point(1, 0), new Point(10, 10));
//         this.body = []
//         this.tail = new BodyPart(new Point(9, 10), this.head);
//     }

//     Grow(){

//     }

//     Move(){
//         this.head.Move()
//     }

//     TurnLeft(){
// this.head.TurnLeft()
//     }

//     TurnRight(){
// this.head.TurnRight()
//     }
// }

export default SnakeObject;
