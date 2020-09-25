import React from "react";
import { useInterval } from "../../common/hooks/useInterval";
import { AddPoints, Scalar } from "../../common/Point";
import { CONST } from "./desktop.const";
import "./desktop.scss";
import RigidBody from "./models/RigidBody";
import AddGravity from "./physics/AddGravity";
import BounceFromBorder from "./physics/BounceFromBorder";

function JumpDesktop(props: any) {
    useInterval(() => {
        let rbs = props.rbs.slice();

        let newRbs = rbs.map((rb: RigidBody) => {
            if (rb.drag == null) {
                rb = BounceFromBorder(rb, CONST);

                rb.vel = AddPoints(rb.vel, rb.acc);
                rb.pos = AddPoints(rb.pos, rb.vel);

                rb.acc = Scalar(0, rb.acc);
            }
            return rb;
        });

        props.setRbs(newRbs);
    }, 1000 / CONST.fps);

    return <div className=""></div>;
}

export default JumpDesktop;
