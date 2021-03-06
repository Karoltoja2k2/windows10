import { Point, Point0, RandomPoint } from "../../../common/Point";
import { IConst } from "../desktop.const";
import RigidBody from "../models/RigidBody";

export default function BounceFromBorder(
    rb: RigidBody,
    settings: IConst
): RigidBody {
    let energyLoss =
        Math.random() * (settings.energyLossTo - settings.energyLossFrom) +
        settings.energyLossFrom;

    // X LEFT
    if (rb.pos.X - settings.iconWidth / 2 < settings.boundryFrom.X) {
        rb.vel = Point(-energyLoss * rb.vel.X, rb.vel.Y);
        rb.pos = Point(
            settings.boundryFrom.X + settings.iconWidth / 2,
            rb.pos.Y
        );
    }

    // X RIGHT
    if (rb.pos.X + settings.iconWidth / 2 > settings.boundryTo.X) {
        rb.vel = Point(-energyLoss * rb.vel.X, rb.vel.Y);
        rb.pos = Point(settings.boundryTo.X - settings.iconWidth / 2, rb.pos.Y);
    }

    // Y TOP
    if (rb.pos.Y - settings.iconHeight / 2 < settings.boundryFrom.Y) {
        rb.vel = Point(rb.vel.X, -energyLoss * rb.vel.Y);
        rb.pos = Point(
            rb.pos.X,
            settings.boundryFrom.Y + settings.iconHeight / 2
        );
    }

    // Y BOT
    if (
        rb.pos.Y + settings.iconHeight / 2 + settings.taskbarHeight >
        settings.boundryTo.Y
    ) {
        console.log('bounce', rb.vel.Y)
        rb.vel = Point(rb.vel.X, -energyLoss * rb.vel.Y);
        rb.acc = Point(rb.acc.X, 0)
        rb.pos = Point(
            rb.pos.X,
            settings.boundryTo.Y -
                settings.iconHeight / 2 -
                settings.taskbarHeight
        );
    }

    return rb;
}
