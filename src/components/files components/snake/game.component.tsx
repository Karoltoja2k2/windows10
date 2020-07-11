import React, { useState, useEffect } from "react";
import "./snake.scss";

import Point from "./game objects/Point";
import Head from "./game objects/Head";
import BodyPart from "./game objects/BodyPart";
// import Fruit from "./game objects/Fruit";
import SnakeObject from "./game objects/SnakeObject";

import Field from "./field.component";

interface Fruit{
	cords:Point
}


const Game = (props: any) => {
	const [size, setSize] = useState({
		X: 25,
		Y: 25,
	});

	const [fruitArray, setFruitArray] = useState([
		{
			cords: new Point(5,5)
		},
		{
			cords: new Point(15,15)
		}
	]);

	useEffect(() => {
		console.log(fruitArray)
	}, [fruitArray])
	const [snakeBody, setSnakeBody] = useState(SnakeObject);

	function spawnFruit() {

		let x = Math.round(Math.random() * size.X);
		let y = Math.round(Math.random() * size.Y);

		let newArray = fruitArray.concat({
			cords: new Point(x, y)
		})

		setFruitArray(newArray);
	}

	function renderGrid() {
		return snakeBody.body.map((body) => {
			return <Field field={body} style={"body"} />;
		});
	}
	useEffect(() => {
		spawnFruit();

		setInterval(() => {
			moveSnake();
		}, 100);
	}, []);

	function moveSnake() {
		let snake = snakeBody;

		let nextCord = snake.head.cords.AddPoint(snake.head.direction);
		let eat = false;
		console.log(fruitArray.length)
		fruitArray.forEach((fruit) => {
			if (fruit.cords.EqualTo(nextCord)) {
				setFruitArray(fruitArray.filter((x) => x !== fruit));
				eat = true;
				return;
			}
		});

		if (eat) {
			let oldTailPnt = new Point(snake.tail.cords.X, snake.tail.cords.Y);
			let oldTailRef = snake.tail;
			moveBody(snake.tail);

			snake.body.push(snake.tail);
			snake.tail = new BodyPart(oldTailPnt, oldTailRef);
			snake.head.Move();
		} else {
			moveBody(snake.tail);
			snake.head.Move();
		}

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
				if (e.key === "a") {
					snakeBody.head.TurnLeft();
				} else if (e.key === "d") {
					snakeBody.head.TurnRight();
				}
			}}
		>
			<div className="grid">
				<Field field={snakeBody.head} style={"head"} />
				{renderGrid()}
				<Field field={snakeBody.tail} style={"tail"} />

				{fruitArray.map((fruit) => (
					<Field field={fruit} style={"fruit"} />
				))}

				<button
					className=""
					onClick={() => {
						setSnakeBody(SnakeObject);
					}}
				>
					Restart
				</button>
				<label>{snakeBody.body.length}</label>
			</div>
		</div>
	);
};

export default React.memo(Game);
