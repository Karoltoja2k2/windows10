import React, { useEffect, useState } from "react";
import { useInterval } from "../../common/hooks/useInterval";

import {
    AddPoints,
    Point0,
    Scalar,
} from "../../common/Point";
import { CONST, IConst } from "./desktop.const";

import "./desktop.scss";
import RigidBody from "./models/RigidBody";
import AddGravity from "./physics/AddGravity";
import AddFriction from "./physics/AddFriction";
import AddBorders from "./physics/AddBorders";

function GravityDesktop(props: any) {
    const [settings, setsettings] = useState<IConst>({
        ...CONST,
    });

    useEffect(() => {
        props.setRbs(props.rbs.map((rb: RigidBody) => {
            return {
                ...rb, 
                vel: Point0,
            }
        }))
    }, [])

    useInterval(() => {
        let rbs = props.rbs.slice();

        let newRbs = rbs.map((rb: RigidBody) => {
            if (rb.drag == null) {
                rb = AddGravity(rb, settings);
                rb = AddBorders(rb, settings);
                rb = AddFriction(rb, settings);

                rb.vel = AddPoints(rb.vel, rb.acc);
                rb.pos = AddPoints(rb.pos, Scalar(1 / settings.fps, rb.vel));
                rb.acc = Point0;
            } else {
                rb.acc = Point0;
                rb.vel = Point0;
            }

            return rb;
        });

        props.setRbs(newRbs);
    }, 1000 / settings.fps);

    return <div className=""></div>;
}

export default GravityDesktop;
