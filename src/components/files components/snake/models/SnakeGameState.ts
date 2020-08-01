import Fruit from "./Fruit";
import BodyPart from "./BodyPart";
import Point from "./Point";

export default interface SnakeGameState {
    run: boolean;
    fruits: Fruit[];
    snake: BodyPart[];
    direction: {
        cords: Point;
        angle: number;
    };
}
