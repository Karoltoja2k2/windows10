import React, { useState, useEffect } from "react";
import "./snake.scss";

import Field from "./field.component";
import { useInterval } from "./useInterval";
import BodyPart from "./models/BodyPart";
import Fruit from "./models/Fruit";
import { FRUITS, SNAKE, SIZE } from "./const";
import Point, { AddPoints, PointsEqual, RandomPoint } from "./models/Point";
import SnakeGameState from "./models/SnakeGameState";
import FieldBase from "./models/FieldBase";

const Game = (props: any) => {
    const [size, setSize] = useState(SIZE);
    const [state, setState] = useState<SnakeGameState>({
        run: true,
        fruits: FRUITS(),
        snake: SNAKE(),
        direction: {
            cords: {
                X: 1,
                Y: 0,
            },
            angle: 0,
        },
    });

    useInterval(() => {
        MoveSnake();
        console.log("rerender");
    }, 100);

    function MoveSnake() {
        let snake: BodyPart[] = state.snake.slice();
        let fruits: Fruit[] = state.fruits.slice();
        let head: BodyPart = snake[0];

        if (snake && state.run) {
            let nextCords = CheckOutOfBorder(
                AddPoints(head.cords, state.direction.cords)
            );

            if (CheckCollisionWithSnake(nextCords)) {
                setState({ ...state, snake: SNAKE() });
                return;
            }

            let tailCords;
            let eatFruit = fruits.find((x) => PointsEqual(x.cords, nextCords));
            if (eatFruit) {
                fruits = fruits.filter((x) => x !== eatFruit);
                fruits.push(SpawnFruit());
                tailCords = { ...snake[0].cords };
            }

            for (let i = snake.length - 1; i >= 0; i--) {
                let body = snake[i];
                let newCords;
                if (body.type === "BODY") {
                    newCords = snake[i - 1].cords;
                } else {
                    newCords = nextCords;
                }
                body.cords = newCords;
            }

            if (tailCords) {
                snake.push({
                    type: "BODY",
                    cords: tailCords,
                });
            }

            setState({
                ...state,
                snake: [...snake],
                fruits: [...fruits],
            });
        }
    }

    function CheckCollisionWithSnake(cords: Point): boolean {
        for (let body of state.snake) {
            if (PointsEqual(body.cords, cords)) {
                return true;
            }
        }
        return false;
    }

    function CheckOutOfBorder(cords: Point): Point {
        let nextCords = cords;
        if (cords.X <= 0) {
            nextCords = { ...cords, X: size.X };
        } else if (cords.X > size.X) {
            nextCords = { ...cords, X: 1 };
        } else if (cords.Y <= 0) {
            nextCords = { ...cords, Y: size.Y };
        } else if (cords.Y > size.Y) {
            nextCords = { ...cords, Y: 1 };
        }
        return nextCords;
    }

    function SpawnFruit(): Fruit {
        let cords = RandomPoint({ X: 1, Y: 1 }, { X: size.X, Y: size.Y });
        while (CheckCollisionWithSnake(cords)) {
            cords = RandomPoint({ X: 1, Y: 1 }, { X: size.X, Y: size.Y });
        }
        return {
            cords,
        };
    }

    function ChangeDirection(
        angle: number
    ): { newDirection: Point; newAngle: number } {
        let newAngle = state.direction.angle + angle;
        let angleRad = newAngle * (Math.PI / 180);
        let newDirection = {
            X: 1 * Math.round(Math.cos(angleRad)),
            Y: -1 * Math.round(Math.sin(angleRad)),
        };
        return { newDirection: newDirection, newAngle: newAngle };
    }

    function TurnHead(angle: number) {
        let { newDirection, newAngle } = ChangeDirection(angle);
        setState({
            ...state,
            direction: {
                cords: newDirection,
                angle: newAngle,
            },
        });
    }

    return (
        <div
            className="snake__container"
            tabIndex={1}
            onLoad={(e) => e.currentTarget.focus()}
            onKeyDown={(e) => {
                if (e.key === "a") {
                    TurnHead(90);
                } else if (e.key === "d") {
                    TurnHead(-90);
                }
            }}
        >
            {/* <button
                className=""
                onClick={() => {
                    setState({ ...state, snake: SNAKE() });
                }}
            >
                Restart
            </button>
            <label>{state.snake.length}</label> */}

            {state.snake && (
                <div className="grid">
                    {state.snake.map((body: BodyPart, index: number) => (
                        <Field field={body} style={body.type} key={index} />
                    ))}

                    {state.fruits.map((fruit: Fruit, index: number) => (
                        <Field field={fruit} style={"fruit"} key={index} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Game;
