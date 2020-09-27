import { IConst } from "../desktop.const";
import RigidBody from "../models/RigidBody";

export default function AddFriction(
    rb: RigidBody,
    settings: IConst
): RigidBody {
    let onGround = rb.onGround === true
    if (onGround){
        rb.vel.X *= settings.friction
    }
    
    return rb;
}