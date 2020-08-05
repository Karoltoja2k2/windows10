import BodyPart from "./models/BodyPart";
import Fruit from "./models/Fruit";
import Point from "./models/Point";

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

export { SNAKE, FRUITS, SIZE };
