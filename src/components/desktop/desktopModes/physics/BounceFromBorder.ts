import { reverse } from "dns";
import IPoint, { InRange, Point } from "../../../common/Point";
import { IConst } from "../desktop.const";
import RigidBody from "../models/RigidBody";

export default function BounceFromBorder(rb: RigidBody, CONST: IConst): RigidBody {
    if (rb.pos.X - CONST.iconWidth / 2 < CONST.boundryFrom.X){
        rb.vel = Point(-CONST.energyLoss * rb.vel.X, rb.vel.Y);
        rb.pos = Point(CONST.boundryFrom.X + CONST.iconWidth / 2, rb.pos.Y)
    } else if (rb.pos.X + CONST.iconWidth / 2 > CONST.boundryTo.X){
        rb.vel = Point(-CONST.energyLoss * rb.vel.X, rb.vel.Y);
        rb.pos = Point(CONST.boundryTo.X - CONST.iconWidth / 2, rb.pos.Y)
    }

    if (rb.pos.Y - CONST.iconHeight / 2 < CONST.boundryFrom.Y){
        rb.vel = Point(rb.vel.X, -CONST.energyLoss * rb.vel.Y);
        rb.pos = Point(rb.pos.X, CONST.boundryFrom.Y + CONST.iconHeight / 2)

    } else if (rb.pos.Y + CONST.iconHeight / 2 > CONST.boundryTo.Y){
        rb.vel = Point(rb.vel.X, -CONST.energyLoss * rb.vel.Y);
        rb.pos = Point(rb.pos.X, CONST.boundryTo.Y - CONST.iconHeight / 2)

    }

    return rb;
}
