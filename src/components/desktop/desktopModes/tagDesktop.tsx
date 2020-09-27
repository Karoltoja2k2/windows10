import React, { useEffect, useState } from "react";
import { useInterval } from "../../common/hooks/useInterval";
import {
    AddPoints,
    Distance,
    NormalizeVector,
    Point,
    Point0,
    Scalar,
    Vector,
    VectorLen,
} from "../../common/Point";
import FileRegistry from "../../system/FileRegistry";
import { IConst, CONST } from "./desktop.const";
import RigidBody from "./models/RigidBody";
import BounceFromBorder from "./physics/BounceFromBorder";

function TagDesktop(props: any) {
    const [settings, setsettings] = useState<IConst>({
        ...CONST,
        energyLossFrom: 0.5,
        energyLossTo: 0.3,
    });

    useEffect(() => {
        props.setRbs(
            props.rbs.map((rb: RigidBody) => {
                return {
                    ...rb,
                    vel: Point0,
                };
            })
        );
    }, []);

    useInterval(() => {
        let rbs = props.rbs;
        let mousePos = Point(props.mouseState.left, props.mouseState.top);
        rbs = rbs.map((rb: RigidBody) => {
            if (rb.drag == null) {
                let vector = Vector(mousePos, rb.pos);
                let vectorLen = VectorLen(vector);
                if (vectorLen < 50) {
                    let vectorNormal = NormalizeVector(vector, vectorLen);
                    rb.acc = AddPoints(
                        rb.acc,
                        Scalar(
                            rb.file.componentId === FileRegistry.PETeacher
                                ? -5
                                : 150,
                            vectorNormal
                        )
                    );
                }
            } else {
                rb.vel = Point0
            }

            rb = BounceFromBorder(rb, settings);

            rb.vel = AddPoints(rb.vel, rb.acc);
            rb.pos = AddPoints(rb.pos, Scalar(1 / settings.fps, rb.vel));
            rb.acc = Point0;

            return rb;
        });

        props.setRbs(rbs);
    }, 1000 / settings.fps);

    return <div></div>;
}

export default TagDesktop;
