import React, { useState, useEffect } from "react";
import "./game.scss";

import Field from "./snakeField.component";
import { useInterval } from "../../common/useInterval";
import BodyPart from "./models/BodyPart";
import Fruit from "./models/Fruit";
import { FRUITS, SNAKE, SIZE as SETTINGS, SPEED_CALC } from "./const";
import Point, { AddPoints, PointsEqual, RandomPoint } from "../../common/Point";
import SnakeGameState from "./models/SnakeGameState";
import DynamicGrid from "../../common/dynamicGrid/dynamicGrid.component";
import { FRUIT_TYPE } from "./models/FRUIT_TYPE";
import FruitField from "./fruitField.component";
import SnakeUi from "./ui.component";
import CalculateSquareSize from "../../common/calculators/squareSize.calculator";

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
        let snakeLen = state.snake.length;
        let newHighscore =
            snakeLen > state.maxLength ? snakeLen : state.maxLength;
        let newSpeed = SPEED_CALC(snakeLen);
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
                if (eatFruit.type === "GOLDEN") {
                    fruits.push(SpawnFruit("BONUS"));
                }
                if (eatFruit.type !== "BONUS") {
                    fruits.push(SpawnFruit("GREEN"));
                }

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

    function SpawnFruit(type: FRUIT_TYPE): Fruit {
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
        if (Math.random() > 0.9) {
            type = "GOLDEN";
        }
        return {
            cords,
            type: type,
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

    const [squareSize, setSquareSize] = useState(
        CalculateSquareSize(
            props.width,
            props.height,
            state.settings.size.X,
            state.settings.size.Y,
            1000,
            1000
        )
    );

    useEffect(() => {
        setSquareSize(
            CalculateSquareSize(
                props.width,
                props.height,
                state.settings.size.X,
                state.settings.size.Y,
                1000,
                1000
            )
        );
    }, [props.width, props.height]);

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
            <div className="snake__container--middle">
                <SnakeUi
                    squareSize={squareSize}
                    highScore={state.maxLength}
                    actualScore={state.snake.length}
                />
                <div className="container__grid">
                    <DynamicGrid
                        columns={state.settings.size.X}
                        rows={state.settings.size.Y}
                        squareSize={0.85 * squareSize}
                    >
                        {state.snake.map((body: BodyPart, index: number) => (
                            <Field
                                field={body}
                                dynamicColor={`${body.type}_speed_${state.settings.speed}`}
                                dynamicRadius={`radius_x${state.direction.cords.X}_y${state.direction.cords.Y}`}
                                squareSize={0.85 * squareSize}
                                isEating={state.isEating}
                                key={index}
                            />
                        ))}

                        {state.fruits.map((fruit: Fruit, index: number) => (
                            <FruitField
                                fruit={fruit}
                                key={index}
                                squareSize={0.85 * squareSize}
                            />
                        ))}
                    </DynamicGrid>
                </div>
            </div>
        </div>
    );
};

export default Game;
