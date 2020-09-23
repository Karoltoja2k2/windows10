import React, { useState } from "react";
import "./gravityIcon.scss";
import "../noselect.scss";

import { useDispatch, useSelector } from "react-redux";
import { OpenWindow, OpenAs } from "../../../actions/windowsActions";
import { RootState } from "../../../reducers";
import File from "../../../models/File";
import { useInterval } from "../hooks/useInterval";
import { AddPoints, Point, RandomPoint, Scalar } from "../Point";

const boundry = Point(window.innerWidth, window.innerHeight);
const gravity = Point(0, Math.sqrt(10) / 60);

function GravityIcon(props: any) {
    const dispatch = useDispatch();
    const drive: File[] = useSelector((state: RootState) => state.driveReducer);
    // const mosueState = useSelector((state: RootState) => state.mouseReducer);

    // const [state, setState] = useState({
    //     position: RandomPoint(Point(0, 0), boundry),
    //     velocity: Point(0, 0),
    //     acceleration: Point(0, 0),
    //     isDragged: false,
    // });

    // useInterval(() => {
    //     let body = state;
    //     if (body.isDragged) {
    //         setState({
    //             ...state,
    //             position: Point(
    //                 mosueState.position.left,
    //                 mosueState.position.top
    //             ),
    //         });
    //         return;
    //     }
    //     body.position = AddPoints(body.position, body.velocity);
    //     if (body.position.Y + 85 >= boundry.Y) {
    //         body.position = Point(body.position.X, boundry.Y - 85);
    //         body.velocity = Point(0, 0);
    //         body.acceleration = Point(0, 0);
    //     } else {
    //         body.acceleration = AddPoints(body.acceleration, gravity);
    //     }
    //     body.velocity = AddPoints(body.velocity, body.acceleration);

    //     setState({ ...body });
    // }, 1000 / 60);

    return (
        <button
            className="gravityIcon noselect"
            style={{ top: props.rb.pos.Y, left: props.rb.pos.X }}
            onMouseDown={() => props.StartDrag(props.rb.id)}
            onDoubleClick={() => dispatch(OpenWindow(props.rb.file))}
        >
            <img draggable={false} src={props.rb.file.icon.src} />
            <label>{props.rb.file.title}</label>
        </button>
    );
}

export default GravityIcon;
