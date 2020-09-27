import { icon } from "@fortawesome/fontawesome-svg-core";
import { AddPoints, Scalar, Point0, Point } from "../../../common/Point";
import { IConst } from "../desktop.const";
import RigidBody from "../models/RigidBody";

export default function AddGravity(rb: RigidBody, settings: IConst): RigidBody {
    let onGround = rb.onGround === true
    if (rb.drag == null && !onGround){
        rb.acc = AddPoints(rb.acc, Scalar(1 / settings.fps, settings.gravity));
    }

    return rb;
}
