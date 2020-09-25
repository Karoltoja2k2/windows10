import { AddPoints, Scalar, Point0 } from "../../../common/Point";
import { IConst } from "../desktop.const";
import RigidBody from "../models/RigidBody";

export default function AddGravity(rb: RigidBody, CONST: IConst): RigidBody {
    if (rb.drag == null) {
        rb.acc = AddPoints(rb.acc, Scalar(1 / CONST.fps, CONST.gravity));
    } else {
        rb.acc = Point0;
    }

    return rb;
}
