import React, { useState, useEffect } from "react";
import "./snake.scss";

import Field from "./field.component";
import { useInterval } from "./useInterval";
import BodyPart from "./models/BodyPart";
import Fruit from "./models/Fruit";
import { FRUITS, SNAKE, SIZE as SETTINGS } from "./const";
import Point, { AddPoints, PointsEqual, RandomPoint } from "./models/Point";
import SnakeGameState from "./models/SnakeGameState";
import FieldBase from "./models/FieldBase";
import { kMaxLength } from "buffer";

const Game = (props: any) => {
    const [state, setState] = useState<SnakeGameState>({
        run: true,
        fruits: FRUITS(),
        isEating: false,
        hasTurned: false,
        maxLength: 3,
        snake: SNAKE(),
        direction: {
            cords: {
                X: 1,
                Y: 0,
            },
            angle: 0,
        },
        settings: SETTINGS(),
    });

    useInterval(() => {
        MoveSnake();
    }, state.settings.speed);

    useEffect(() => {
        let newHighscore =
            state.snake.length > state.maxLength
                ? state.snake.length
                : state.maxLength;
        let len = state.snake.length;
        let newSpeed = state.settings.speed;
        switch (len) {
            case 10: {
                newSpeed = 95;
                break;
            }
            case 20: {
                newSpeed = 90;
                break;
            }
            case 30: {
                newSpeed = 85;
                break;
            }
            case 40: {
                newSpeed = 80;
                break;
            }
            case 50: {
                newSpeed = 75;
                break;
            }
            case 60: {
                newSpeed = 70;
                break;
            }
        }
        if (
            newSpeed !== state.settings.speed ||
            newHighscore !== state.maxLength
        ) {
            setState({
                ...state,
                maxLength: newHighscore,
                settings: {
                    ...state.settings,
                    speed: newSpeed,
                },
            });
        }
    }, [state.snake.length]);

    function MoveSnake() {
        let snake: BodyPart[] = state.snake.slice();
        let fruits: Fruit[] = state.fruits.slice();
        let head: BodyPart = snake[0];
        let isEating: boolean = state.isEating;
        let hasTurned: boolean = state.hasTurned;

        if (snake && state.run) {
            let nextCords = CheckOutOfBorder(
                AddPoints(head.cords, state.direction.cords)
            );
            if (CheckCollisionWithSnake(nextCords)) {
                let index = snake.findIndex((x) =>
                    PointsEqual(x.cords, nextCords)
                );
                snake.splice(index);
            }

            let tailCords;
            let eatFruit = fruits.find((x) => PointsEqual(x.cords, nextCords));
            if (eatFruit) {
                isEating = true;
                fruits = fruits.filter((x) => x !== eatFruit);
                fruits.push(SpawnFruit());
                tailCords = { ...snake[0].cords };
            } else {
                isEating = false;
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

            hasTurned = hasTurned ? false : hasTurned;
            setState({
                ...state,
                isEating: isEating,
                hasTurned: hasTurned,
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
            nextCords = { ...cords, X: state.settings.size.X };
        } else if (cords.X > state.settings.size.X) {
            nextCords = { ...cords, X: 1 };
        } else if (cords.Y <= 0) {
            nextCords = { ...cords, Y: state.settings.size.Y };
        } else if (cords.Y > state.settings.size.Y) {
            nextCords = { ...cords, Y: 1 };
        }
        return nextCords;
    }

    function SpawnFruit(): Fruit {
        let cords = RandomPoint(
            { X: 1, Y: 1 },
            { X: state.settings.size.X, Y: state.settings.size.Y }
        );
        while (CheckCollisionWithSnake(cords)) {
            console.log("fruit collide with snake");
            cords = RandomPoint(
                { X: 1, Y: 1 },
                { X: state.settings.size.X, Y: state.settings.size.Y }
            );
        }
        return {
            cords,
        };
    }

    function TurnHead(angle: number) {
        let angleValidation = Math.abs(state.direction.angle - angle);
        if (
            angleValidation === 180 ||
            angleValidation === 0 ||
            state.hasTurned
        ) {
            return;
        }

        let angleRad = angle * (Math.PI / 180);
        setState({
            ...state,
            hasTurned: true,
            direction: {
                cords: {
                    X: 1 * Math.round(Math.cos(angleRad)),
                    Y: -1 * Math.round(Math.sin(angleRad)),
                },
                angle: angle,
            },
        });
    }

    return (
        <div
            className="snake__container"
            tabIndex={1}
            onLoad={(e) => e.currentTarget.focus()}
            onKeyDown={(e) => {
                switch (e.key) {
                    case "w": {
                        TurnHead(90);
                        break;
                    }
                    case "a": {
                        TurnHead(180);
                        break;
                    }
                    case "s": {
                        TurnHead(270);
                        break;
                    }
                    case "d": {
                        TurnHead(0);
                        break;
                    }
                    default:
                        return;
                }
            }}
        >
            <button
                className=""
                onClick={() => {
                    MoveSnake();
                }}
            >
                Restart
            </button>
            <label>{state.maxLength}</label>

            {state.snake && (
                <div className="grid">
                    {state.snake.map((body: BodyPart, index: number) => (
                        <Field
                            field={body}
                            dynamicColor={`${body.type}_speed_${state.settings.speed}`}
                            dynamicRadius={`radius_x${state.direction.cords.X}_y${state.direction.cords.Y}`}
                            isEating={state.isEating}
                            key={index}
                        />
                    ))}

                    {state.fruits.map((fruit: Fruit, index: number) => (
                        <Field
                            field={fruit}
                            dynamicColor={"fruit"}
                            key={index}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Game;
