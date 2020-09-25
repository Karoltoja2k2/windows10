import { Point } from "../../../common/Point";
import { IConst } from "../desktop.const";
import RigidBody from "../models/RigidBody";

export default function AddGround(rb: RigidBody, CONST: IConst): RigidBody {
    if (rb.pos.Y > CONST.boundryTo.Y - CONST.iconHeight) {
        rb.pos = Point(rb.pos.X, CONST.boundryTo.Y - CONST.iconHeight);
        rb.vel = Point(rb.vel.X, 0)
    }

    return rb;
}
