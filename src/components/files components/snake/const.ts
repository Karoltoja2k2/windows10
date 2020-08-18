import BodyPart from "./models/BodyPart";
import Fruit from "./models/Fruit";
import Point from "../../common/Point";

function SNAKE(): BodyPart[] {
    return [
        {
            cords: {
                X: 10,
                Y: 10,
            },
            type: "HEAD",
        },
        {
            cords: {
                X: 9,
                Y: 10,
            },
            type: "BODY",
        },
        {
            cords: {
                X: 8,
                Y: 10,
            },
            type: "BODY",
        },
    ];
}

function FRUITS(): Fruit[] {
    return [
        { cords: { X: 1, Y: 1 }, type: "GREEN" },
        { cords: { X: 10, Y: 1 }, type: "GREEN" },
        { cords: { X: 5, Y: 5 }, type: "GREEN" },
    ];
}

function SIZE(): { size: Point; speed: number } {
    return {
        size: {
            X: 25,
            Y: 25,
        },
        speed: 100,
    };
}

function SPEED_CALC(snakeLen: number) : number{
    let newSpeed;
    if (snakeLen < 10) {
        newSpeed = 100;
    } else if (snakeLen >= 10 && snakeLen < 20) {
        newSpeed = 95;
    } else if (snakeLen >= 20 && snakeLen < 30) {
        newSpeed = 90;
    } else if (snakeLen >= 30 && snakeLen < 40) {
        newSpeed = 85;
    } else if (snakeLen >= 40 && snakeLen < 50) {
        newSpeed = 80;
    } else if (snakeLen >= 50 && snakeLen < 60) {
        newSpeed = 75;
    } else {
        newSpeed = 70;
    }
    return newSpeed;
}

export { SNAKE, FRUITS, SIZE, SPEED_CALC };
