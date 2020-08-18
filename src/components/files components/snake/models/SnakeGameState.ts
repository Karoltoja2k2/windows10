import Fruit from "./Fruit";
import BodyPart from "./BodyPart";
import Point from "../../../common/Point";

export default interface SnakeGameState {
    run: boolean;
    fruits: Fruit[];
    isEating: boolean;
    hasTurned: boolean;
    maxLength: number,
    snake: BodyPart[];
    direction: {
        cords: Point;
        angle: number;
    };
    settings: {
        size: Point;
        speed: number;
    };
}
