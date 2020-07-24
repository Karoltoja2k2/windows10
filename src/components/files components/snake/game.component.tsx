import React, { useState, useEffect } from "react";
import "./snake.scss";

import Point from "./game objects/Point";
// import Head from "./game objects/Head";
// import BodyPart from "./game objects/BodyPart";
// import Fruit from "./game objects/Fruit";
// import SnakeObject from "./game objects/SnakeObject";

import Field from "./field.component";
import { create } from "domain";
// import Head from "./game objects/Head";

interface FieldBase {
    cords: Point;
}

interface Fruit extends FieldBase {}

interface BodyPart extends FieldBase {
    nextBody?: BodyPart;
}

interface Head extends BodyPart {
    direction: Point;
    angle: number;
}

interface Snake {
    head: Head;
    body: BodyPart[];
    tail: BodyPart;
}

const Game = (props: any) => {
    const [size, setSize] = useState({
        X: 25,
        Y: 25,
    });

    const [run, setRun] = useState(false);
    const [fruits, setFruits] = useState<Fruit[]>([]);
    const [snake, setSnake] = useState<Snake>();
    const [clock, setClock] = useState(0);

    useEffect(() => {
		tick();			
	}, [run]);

    useEffect(() => {
		NewGame()
	}, []);
	
	function NewGame(){
		spawnFruit();
        createSnake();
		setRun(true);
	}

    function tick() {
        if (run) {
            moveSnake();
            setTimeout(() => {
                tick();
            }, 100);
        }
    }

    function createSnake() {
        let head: Head = {
            cords: new Point(10, 10),
            direction: new Point(1, 0),
            angle: 0,
        };
        let bodyPart: BodyPart = {
            cords: new Point(9, 10),
            nextBody: head,
        };
        let tail: BodyPart = {
            cords: new Point(8, 10),
            nextBody: bodyPart,
        };

        setSnake({
            head: head,
            body: [bodyPart],
            tail: tail,
        });
    }

    function spawnFruit() {
        let x = Math.round(Math.random() * size.X);
        let y = Math.round(Math.random() * size.Y);

        let newArray = fruits.concat({
            cords: new Point(x, y),
        });

        setFruits(newArray);
    }

    function moveSnake() {
        let snakeCopy: Snake | undefined = snake;

        if (snakeCopy && run) {
            let nextCord = snakeCopy.head.cords.AddPoint(
                snakeCopy.head.direction
            );
            let eat = false;
            fruits.forEach((fruit) => {
                if (fruit.cords.EqualTo(nextCord)) {
                    setFruits(fruits.filter((x) => x !== fruit));
                    eat = true;
                    return;
                }
            });

            if (eat) {
                spawnFruit();

                let oldTailPnt = new Point(
                    snakeCopy!.tail.cords.X,
                    snakeCopy!.tail.cords.Y
                );
                let oldTailRef = snakeCopy!.tail;
                moveBody(snakeCopy!.tail);

                snakeCopy!.body.push(snakeCopy!.tail);
                snakeCopy!.tail = {
                    cords: oldTailPnt,
                    nextBody: oldTailRef,
                };
                snakeCopy.head = moveHead(snakeCopy!.head);
            } else {
                moveBody(snakeCopy!.tail);
                snakeCopy.head = moveHead(snakeCopy!.head);
            }

            setSnake({
                head: snakeCopy!.head,
                body: snakeCopy!.body,
                tail: snakeCopy!.tail,
            });
        }
    }

    function moveHead(head: Head) {
        head.cords = head.cords.AddPoint(head.direction);
        return head;
    }

    function moveBody(bodyPart: BodyPart) {
        if (bodyPart.nextBody) {
            bodyPart.cords = bodyPart.nextBody.cords;

            moveBody(bodyPart.nextBody);
        }
    }

    function Turn(head: Head, angle: number) {
        head.angle += angle;
        let angleRad = head.angle * (Math.PI / 180);

        head.direction = new Point(
            1 * Math.round(Math.cos(angleRad)),
            -1 * Math.round(Math.sin(angleRad))
        );
    }

    return (
        <div
            className="snake__container"
            tabIndex={1}
            onLoad={(e) => e.currentTarget.focus()}
            onKeyDown={(e) => {
                if (e.key === "a") {
                    Turn(snake!.head, 90);
                } else if (e.key === "d") {
                    Turn(snake!.head, -90);
                }
            }}
        >
            {snake !== null && run && (
                <div className="grid">
                    <Field field={snake!.head} style={"head"} />
                    {snake!.body.map((body: BodyPart, index: number) => (
                        <Field field={body} style={"body"} key={index} />
                    ))}
                    <Field field={snake!.tail} style={"tail"} />

                    {fruits.map((fruit: Fruit, index: number) => (
                        <Field field={fruit} style={"fruit"} key={index} />
                    ))}

                    <button
                        className=""
                        onClick={() => {
                            NewGame()
                        }}
                    >
                        Restart
                    </button>
                    <label>{snake!.body.length + 2}</label>
                </div>
            )}
        </div>
    );
};

export default Game;
