import FieldBase from "./FieldBase";
import { FRUIT_TYPE } from "./FRUIT_TYPE";

export default interface Fruit extends FieldBase {
    type: FRUIT_TYPE;
}
