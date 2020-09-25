import React, { useEffect, useState } from "react";
import { useInterval } from "../../common/hooks/useInterval";
import DesktopIcon from "../../common/icons/desktopIcon.component";

import IPoint, {
    AddPoints,
    InRange,
    Point,
    Point0,
    PointBetweenPoints,
    Scalar,
    SubtractPoints,
} from "../../common/Point";
import { CONST } from "./desktop.const";

import "./desktop.scss";
import RigidBody from "./models/RigidBody";
import SelectState from "./models/SelectState";
import BounceFromBorder from "./physics/BounceFromBorder";
import AddGravity from "./physics/AddGravity";
import AddGround from "./physics/AddGround";

const iconWidth = 75;
const iconHeight = 85;
const taskBarHeight = 35;

const boundryFrom = Point0;
const boundryTo = Point(window.innerWidth, window.innerHeight);
const iconBoundryFrom = Point(
    boundryFrom.X + iconWidth / 2,
    boundryFrom.Y + iconHeight / 2
);
const iconBoundryTo = Point(
    boundryTo.X - iconWidth / 2,
    boundryTo.Y - iconHeight / 2 - taskBarHeight
);

const fps = 60;
const gravity = Point(0, 10);
const frictionLoss = 0.9;
const iconRadius = 80;

function GravityDesktop(props: any) {
    // function CheckCollision2(rb: RigidBody): RigidBody {
    //     let vel = rb.vel;
    //     let pos = rb.pos;
    //     for (let body of state) {
    //         let vector = Vector(rb.pos, body.pos);
    //         let vectorLen = VectorLen(vector);
    //         if (vectorLen < 100) {
    //             if (rb.id !== body.id) {
    //                 let directionVector = ReverseVector(
    //                     NormalizeVector(vector, vectorLen)
    //                 );
    //                 let offsetVector = Scalar(100 - vectorLen, directionVector);
    //                 pos = AddPoints(rb.pos, offsetVector);
    //             }
    //         }
    //     }

    //     rb.pos = pos;
    //     rb.vel = vel;
    //     return rb;
    // }

    // function FloorVelocity(vel: IPoint) {
    //     return {
    //         X: Math.abs(vel.X) < 5 ? 0 : vel.X,
    //         Y: Math.abs(vel.Y) < 5 ? 0 : vel.Y,
    //     };
    // }

    // function CheckCollision(rb: RigidBody): RigidBody {
    //     let vel = rb.vel;
    //     let pos = rb.pos;
    //     for (let body of state) {
    //         let vector = Vector(rb.pos, body.pos);
    //         let vectorLen = VectorLen(vector);
    //         if (vectorLen < 100) {
    //             if (rb.id !== body.id) {
    //                 let directionVector = ReverseVector(
    //                     NormalizeVector(vector, vectorLen)
    //                 );
    //                 let offsetVector = Scalar(100 - vectorLen, directionVector);
    //                 console.log("before", rb.pos);
    //                 rb.pos = AddPoints(rb.pos, offsetVector);
    //                 console.log(rb.pos);

    //                 // console.log(`center vector -`, vector)
    //                 // console.log(`offset vector -`, offsetVector)
    //                 // console.log(`collide ${rb.file.title} with ${body.file.title}`)
    //                 // vel = Scalar(-energyLoss, rb.vel);
    //                 // vel = AddPoints(vel, body.vel)
    //                 // pos = AddPoints(Scalar(1/fps, vel), pos);
    //             }
    //         }
    //     }

    //     rb.pos = pos;
    //     rb.vel = vel;
    //     return rb;
    // }

    // function BounceFromBorder(rb: RigidBody): RigidBody {
    //     if (!InRange(rb.pos.X, 0, boundryTo.X - iconRadius)) {
    //         rb.vel = Point(-ENERGY_LOSS * rb.vel.X, rb.vel.Y);
    //     }
    //     if (!InRange(rb.pos.Y, 0, boundryTo.Y - iconRadius)) {
    //         // console.log("should bounce");
    //         rb.vel = Point(rb.vel.X, -ENERGY_LOSS * rb.vel.Y);
    //     }

    //     return rb;
    // }

    useInterval(() => {
        let rbs = props.rbs.slice();

        let newRbs = rbs.map((rb: RigidBody) => {
            if (rb.drag == null){

                rb = AddGravity(rb, CONST);
                rb = AddGround(rb, CONST)
                
                rb.vel = AddPoints(rb.vel, rb.acc);
                rb.pos = AddPoints(rb.pos, rb.vel);
                
                rb.acc = Scalar(0, rb.acc)
            }

            return rb;
        });

        props.setRbs(newRbs);
    }, 1000 / fps);

    return <div className=""></div>;
}

export default GravityDesktop;
