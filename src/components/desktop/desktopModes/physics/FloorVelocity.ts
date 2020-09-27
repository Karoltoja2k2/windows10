import { IConst } from "../desktop.const";
import RigidBody from "../models/RigidBody";

export default function FloorVelocity(rb: RigidBody, settings: IConst) : RigidBody {
    rb.vel = {
        X: Math.abs(rb.vel.X) < 15 ? 0 : rb.vel.X,
        Y: Math.abs(rb.vel.Y) < 16.5 ? 0 : rb.vel.Y
    }

    return rb;
}