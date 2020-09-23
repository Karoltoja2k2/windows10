import File from "../../../../models/File";
import IPoint from "../../../common/Point";

export default interface RigidBody {
    id: number;
    file: File;
    pos: IPoint;
    vel: IPoint;
    acc: IPoint;
}
