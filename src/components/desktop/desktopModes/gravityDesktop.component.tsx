import { setServers } from "dns";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import File from "../../../models/File";
import { RootState } from "../../../reducers";
import { useInterval } from "../../common/hooks/useInterval";

import GravityIcon from "../../common/icons/gravityIcon.component";
import IPoint, {
    AddPoints,
    Distance,
    InRange,
    NormalizeVector,
    Point,
    PointsEqual,
    RandomPoint,
    ReverseVector,
    Scalar,
    SubtractPoints,
    Vector,
    VectorLen,
} from "../../common/Point";

import "./gravityDesktop.scss";
const Point0 = Point(0, 0);

const boundryFrom = Point0;
const boundryTo = Point(window.innerWidth, window.innerHeight);
let iconWidth = 75;
let iconHeight = 85;

const fps = 60;
const gravity = Point(0, 10);
const energyLoss = 0.85;
const frictionLoss = 0.9;
const iconRadius = 80;

interface RigidBody {
    id: number;
    file: File;
    pos: IPoint;
    vel: IPoint;
    acc: IPoint;
}

interface DragState {
    id: number | null;
    offsetTop: number;
    offsetLeft: number;
}

function GravityDesktop(props: any) {
    const [state, setstate] = useState(Initialize());

    const [drag, setDrag] = useState<DragState>({
        id: null,
        offsetTop: 0,
        offsetLeft: 0,
    });

    function StartDrag(id: number) {
        let rb = state.find((x) => x.id === id)!;
        let offset = SubtractPoints(
            rb.pos,
            Point(props.mouseState.left, props.mouseState.top)
        );
        setDrag({
            id: id,
            offsetTop: offset.Y,
            offsetLeft: offset.X,
        });
    }

    useEffect(() => {
        let newFile: File | null = null;
        for (let file of props.files) {
            let pair = state.find((x) => x.file.fileId === file.fileId);
            if (pair == null) {
                newFile = file;
                break;
            }
        }

        let oldRbs = state.slice();
        if (newFile != null) {
            let rbs = Initialize();
            let newFileRb = rbs.find((x) => x.file.fileId === newFile!.fileId)!;
            setstate([...oldRbs, newFileRb]);
        }
    }, [props.files]);

    function Initialize() {
        let row = 0;
        let col = 0;
        let gridFrom = Point(50, 100);
        let gridTo = Point(window.innerWidth < 700 ? window.innerWidth * 0.8 : 700, 1000);
        let gridGap = 10;

        let rigidBodies: RigidBody[] = props.files.map(
            (file: File, index: number) => {
                let pos = Point(
                    gridFrom.X +
                        col * iconWidth +
                        iconWidth / 2 +
                        col * gridGap,
                    gridFrom.Y +
                        row * iconHeight +
                        iconHeight / 2 +
                        row * gridGap
                );

                let result: RigidBody = {
                    id: index,
                    file: file,
                    pos: pos,
                    vel: Point0,
                    acc: Point0,
                };

                col++;
                if (col * iconWidth > gridTo.X) {
                    col = 0;
                    row++;
                }

                return result;
            }
        );

        return rigidBodies;
    }

    useInterval(() => {
        let rbs = state.slice();
        if (drag.id != null) {
            rbs = rbs.map((rb: RigidBody) => {
                if (rb.id === drag.id) {
                    rb.pos = {
                        X: props.mouseState.left + drag.offsetLeft,
                        Y: props.mouseState.top + drag.offsetTop,
                    };
                }

                return rb;
            });
        }

        setstate(rbs);

        // console.log('interval')
    }, 1000 / fps);

    // useInterval(() => {
    //     console.log('interval')
    // }, 1000)

    // function UpdatePosition(){
    //     let rbs = state.slice();
    //     if (drag != null){
    //         rbs = rbs.map((rb : RigidBody) => {
    //             if (rb.id === drag.id){
    //                 rb.pos = {
    //                     X: mosueState.position.left,
    //                     Y: mosueState.position.top
    //                 }
    //             }

    //             rb = CheckCollision2(rb)
    //             return rb;
    //         })
    //     }

    //     setstate(rbs)
    // }

    function CheckCollision2(rb: RigidBody): RigidBody {
        let vel = rb.vel;
        let pos = rb.pos;
        for (let body of state) {
            let vector = Vector(rb.pos, body.pos);
            let vectorLen = VectorLen(vector);
            if (vectorLen < 100) {
                if (rb.id !== body.id) {
                    let directionVector = ReverseVector(
                        NormalizeVector(vector, vectorLen)
                    );
                    let offsetVector = Scalar(100 - vectorLen, directionVector);
                    pos = AddPoints(rb.pos, offsetVector);
                }
            }
        }

        rb.pos = pos;
        rb.vel = vel;
        return rb;
    }

    useEffect(() => {}, []);

    // useInterval(() => {
    //     let rbs = state.map((rb: RigidBody) => {
    //         // rb.pos = AddPoints(rb.pos, rb.vel);
    //         // if (rb.pos.Y + iconRadius > boundryTo.Y){
    //         //     rb.pos.Y = boundryTo.Y - iconRadius
    //         // } else {
    //         // rb.acc = AddPoints(rb.acc, gravity)
    //         // }

    //         // rb = BounceFromBorder(rb)

    //         // if (rb.pos.Y + 85 >= boundryTo.Y) {
    //         //     rb.pos = Point(rb.pos.X, boundryTo.Y - 85);
    //         //     rb.acc = Scalar(-energyLoss, rb.vel);
    //         //     rb.vel = Point(0, 0);
    //         // } else {
    //         //     rb.acc = AddPoints(rb.acc, gravity);
    //         // }
    //         // rb.vel = AddPoints(rb.vel, rb.acc);
    //         // rb.acc = Point0;
    //         // var colliders = CheckCollision(rb);
    //         // if (colliders.length > 0){
    //         //     colliders.forEach((collider: RigidBody) => {
    //         //         let collisionVel = AddPoints(collider.vel, rb.vel)
    //         //         collider.acc = Scalar(energyLoss, collisionVel)
    //         //         rb.acc = Scalar(energyLoss, collisionVel)
    //         //     })
    //         // }
    //         // rb = BounceFromBorder(rb)

    //         // if (rb.pos.Y < boundryTo.Y - iconRadius) {
    //         //     rb.acc = AddPoints(rb.acc, gravity);
    //         // }

    //         rb.vel = AddPoints(rb.acc, rb.vel);
    //         rb.acc = Point0;

    //         rb.vel = FloorVelocity(rb.vel);

    //         if (rb.vel.Y === 0) {
    //             rb.vel.X *= frictionLoss;
    //         }
    //         rb = BounceFromBorder(rb);

    //         rb.pos = AddPoints(Scalar(1 / fps, rb.vel), rb.pos);

    //         rb = CheckCollision(rb);

    //         return rb;
    //     });
    //     setstate(rbs);
    // }, 1000 / 60);

    function FloorVelocity(vel: IPoint) {
        return {
            X: Math.abs(vel.X) < 5 ? 0 : vel.X,
            Y: Math.abs(vel.Y) < 5 ? 0 : vel.Y,
        };
    }

    function CheckCollision(rb: RigidBody): RigidBody {
        let vel = rb.vel;
        let pos = rb.pos;
        for (let body of state) {
            let vector = Vector(rb.pos, body.pos);
            let vectorLen = VectorLen(vector);
            if (vectorLen < 100) {
                if (rb.id !== body.id) {
                    let directionVector = ReverseVector(
                        NormalizeVector(vector, vectorLen)
                    );
                    let offsetVector = Scalar(100 - vectorLen, directionVector);
                    console.log("before", rb.pos);
                    rb.pos = AddPoints(rb.pos, offsetVector);
                    console.log(rb.pos);

                    // console.log(`center vector -`, vector)
                    // console.log(`offset vector -`, offsetVector)
                    // console.log(`collide ${rb.file.title} with ${body.file.title}`)
                    // vel = Scalar(-energyLoss, rb.vel);
                    // vel = AddPoints(vel, body.vel)
                    // pos = AddPoints(Scalar(1/fps, vel), pos);
                }
            }
        }

        rb.pos = pos;
        rb.vel = vel;
        return rb;
    }

    function BounceFromBorder(rb: RigidBody): RigidBody {
        if (!InRange(rb.pos.X, 0, boundryTo.X - iconRadius)) {
            rb.vel = Point(-energyLoss * rb.vel.X, rb.vel.Y);
        }
        if (!InRange(rb.pos.Y, 0, boundryTo.Y - iconRadius)) {
            // console.log("should bounce");
            rb.vel = Point(rb.vel.X, -energyLoss * rb.vel.Y);
        }

        return rb;
    }

    return (
        <div className="desktop">
            <div
                className="desktop__icons"
                onMouseUp={() =>
                    setDrag({ id: null, offsetTop: 0, offsetLeft: 0 })
                }
                onMouseLeave={() =>
                    setDrag({ id: null, offsetTop: 0, offsetLeft: 0 })
                }
                // onMouseMove={() => UpdatePosition()}
            >
                {/* {props.files.map((obj: any, index: number) => (
                    <GravityIcon file={obj} key={index} />
                ))} */}
                {state.map((rb: any, index: number) => (
                    <GravityIcon key={index} rb={rb} StartDrag={StartDrag} />
                ))}
            </div>

            <div className="desktop__activate">
                <p className="top">Aktywuj system Windows</p>
                <p className="down">
                    Przejdź do ustawień, aby aktywować system Windows.
                </p>
            </div>
        </div>
    );
}

export default GravityDesktop;
