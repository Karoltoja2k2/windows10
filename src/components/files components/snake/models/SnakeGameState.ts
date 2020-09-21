import Fruit from "./Fruit";
import BodyPart from "./BodyPart";
import IPoint from "../../../common/Point";

export default interface SnakeGameState {
    run: boolean;
    fruits: Fruit[];
    isEating: boolean;
    hasTurned: boolean;
    maxLength: number,
    snake: BodyPart[];
    direction: {
        cords: IPoint;
        angle: number;
    };
    settings: {
        size: IPoint;
        speed: number;
    };
}
