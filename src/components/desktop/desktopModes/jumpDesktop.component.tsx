import React, { useEffect, useState } from "react";
import { useInterval } from "../../common/hooks/useInterval";
import { AddPoints, Point, RandomPoint, Scalar } from "../../common/Point";
import FileRegistry from "../../system/FileRegistry";
import { CONST, IConst } from "./desktop.const";
import "./desktop.scss";
import RigidBody from "./models/RigidBody";
import BounceFromBorder from "./physics/BounceFromBorder";

function JumpDesktop(props: any) {
    const [settings, setsettings] = useState<IConst>({
        ...CONST,
        energyLossFrom: 1,
        energyLossTo: 1,
    });

    useEffect(() => {
        props.setRbs(
            props.rbs.map((rb: RigidBody) => {
                let vel = RandomPoint(Point(-1000, -1000), Point(1000, 1000));
                if (rb.file.componentId === FileRegistry.PETeacher) {
                    vel = Point(0, 0);
                }

                return {
                    ...rb,
                    vel,
                };
            })
        );
    }, []);

    useInterval(() => {
        let rbs = props.rbs.slice();

        let newRbs = rbs.map((rb: RigidBody) => {
            if (rb.drag == null) {
                rb = BounceFromBorder(rb, settings);

                rb.vel = AddPoints(rb.vel, rb.acc);
                rb.pos = AddPoints(rb.pos, Scalar(1 / settings.fps, rb.vel));

                rb.acc = Scalar(0, rb.acc);
            }
            return rb;
        });

        props.setRbs(newRbs);
    }, 1000 / CONST.fps);

    return <div className=""></div>;
}

export default JumpDesktop;
