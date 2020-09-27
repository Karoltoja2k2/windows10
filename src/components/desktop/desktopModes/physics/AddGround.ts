import { Point } from "../../../common/Point";
import { IConst } from "../desktop.const";
import RigidBody from "../models/RigidBody";

export default function AddGround(rb: RigidBody, settings: IConst): RigidBody {
    if (rb.pos.Y > settings.boundryTo.Y - settings.iconHeight) {
        rb.pos = Point(rb.pos.X, settings.boundryTo.Y - settings.iconHeight);
        rb.onGround = true;
    } else {
        rb.onGround = false
    }

    return rb;
}
