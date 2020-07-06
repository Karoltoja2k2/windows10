import React, { useState, useEffect } from "react";
import "./snake.scss";

// import Field from "./field.component"

import Field from "./field.component";

interface IField {
	cords: Point;
	head: boolean;
}

class FieldBase {
	cords: Point;
	constructor(cords: Point) {
		this.cords = cords;
	}
}

class Fruit extends FieldBase {
	constructor(cords: Point) {
		super(cords);
	}
}

class BodyPart extends FieldBase {
	nextBody?: BodyPart;

	constructor(cords: Point, nextBody?: BodyPart) {
		super(cords);
		this.nextBody = nextBody;
	}
}

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

class Point {
	X: number;
	Y: number;

	constructor(X: number, Y: number) {
		this.X = X;
		this.Y = Y;
	}

	AddPoint(addPnt: Point): Point {
		return new Point(addPnt.X + this.X, addPnt.Y + this.Y);
	}

	InsideBoundries(pnt: Point, X: number, Y: number): boolean {
		return pnt.X < X && pnt.X >= 0 && pnt.Y < Y && pnt.Y >= 0;
	}
}

const Game = (props: any) => {
	const [size, setSize] = useState({
		X: 25,
		Y: 25,
	});

	const [fruitArray, setFruitArray] = useState([new Fruit(new Point(5, 5))]);
	const [snakeBody, setSnakeBody] = useState(generateBody());

	function spawnFruit() {
		let x = Math.round(Math.random());
		let y = Math.round(Math.random());

		setFruitArray([...fruitArray, new Fruit(new Point(x, y))]);
	}

	function generateBody () {
		console.log('asd')
		spawnFruit();
		let head = new Head(new Point(1, 0), new Point(10, 10));

		let body1 = new BodyPart(new Point(9, 10), head);
		let body2 = new BodyPart(new Point(8, 10), body1);
		let body3 = new BodyPart(new Point(7, 10), body2);
		let body = [body1, body2, body3];

		let tail = new BodyPart(new Point(6, 10), body3);

		return { head: head, body: body, tail: tail };
	}



	function renderGrid() {
		return snakeBody.body.map((body) => {
			return <Field field={body} style={"body"} />;
		});
	}
	useEffect(() => {
		setInterval(() => {
			moveSnake();
		}, 100);
	}, []);

	function moveSnake() {
		let snake = snakeBody;

		moveBody(snake.tail);
		snake.head.Move();

		setSnakeBody({ head: snake.head, body: snake.body, tail: snake.tail });
	}

	function moveBody(bodyPart: BodyPart) {
		if (bodyPart.nextBody) {
			bodyPart.cords = bodyPart.nextBody.cords;

			moveBody(bodyPart.nextBody);
		}
	}

	// function turnLeft(){
	//     let snake = snakeBody;
	//     snake.head.TurnLeft()

	// 	setSnakeBody({ head: snake.head, body: snake.body});
	// }

	// function turnRight(){
	//     let snake = snakeBody;
	//     snake.head.TurnRight()

	// 	setSnakeBody({ head: snake.head, body: snake.body});
	// }

	return (
		<div
			className="snake__container"
			tabIndex={1}
			onLoad={(e) => e.currentTarget.focus()}
			onKeyDown={(e) => {
				console.log(e);
				if (e.key === "a") {
					snakeBody.head.TurnLeft();
				} else if (e.key === "d") {
					snakeBody.head.TurnRight();
				}
			}}
		>
			<Field field={snakeBody.head} style={"head"} />
			{renderGrid()}
			<Field field={snakeBody.tail} style={"tail"} />

			{fruitArray.map((fruit) => {
				return <Field field={fruit} style={"fruit"} />;
			})}

			<button
				className=""
				onClick={() => {
					setSnakeBody(generateBody());
				}}
			>
				Restart
			</button>
		</div>
	);
};

export default React.memo(Game);
