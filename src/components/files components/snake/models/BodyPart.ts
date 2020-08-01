import FieldBase from "./FieldBase";

export default interface BodyPart extends FieldBase {
    type: "HEAD" | "BODY" | "TAIL";
}
