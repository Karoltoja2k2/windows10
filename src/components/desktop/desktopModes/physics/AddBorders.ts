import { Point, Point0, RandomPoint } from "../../../common/Point";
import { IConst } from "../desktop.const";
import RigidBody from "../models/RigidBody";

export default function AddBorders(
    rb: RigidBody,
    settings: IConst
): RigidBody {
    let energyLoss =
        Math.random() * (settings.energyLossTo - settings.energyLossFrom) +
        settings.energyLossFrom;

    // X LEFT
    if (rb.pos.X - settings.iconWidth / 2 < settings.boundryFrom.X) {
        rb.pos = Point(
            settings.boundryFrom.X + settings.iconWidth / 2,
            rb.pos.Y
        );
    }

    // X RIGHT
    if (rb.pos.X + settings.iconWidth / 2 > settings.boundryTo.X) {
        rb.pos = Point(settings.boundryTo.X - settings.iconWidth / 2, rb.pos.Y);
    }

    // Y TOP
    if (rb.pos.Y - settings.iconHeight / 2 < settings.boundryFrom.Y) {
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
        rb.pos = Point(
            rb.pos.X,
            settings.boundryTo.Y -
                settings.iconHeight / 2 -
                settings.taskbarHeight
        );
        rb.vel.Y = 0
        rb.onGround = true;
    } else {
        rb.onGround = false
    }

    return rb;
}
