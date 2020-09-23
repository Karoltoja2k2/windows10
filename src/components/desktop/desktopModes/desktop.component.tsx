import React, { useEffect, useState } from "react";
import File from "../../../models/File";
import { useInterval } from "../../common/hooks/useInterval";
import DesktopIcon from "../../common/icons/desktopIcon.component";
import IPoint, { SubtractPoints, Point } from "../../common/Point";
import { MapFilesToRbs } from "./desktop.const";

import "./desktop.scss";
import RigidBody from "./models/RigidBody";

interface DragState {
    id: number | null;
    offsetTop: number;
    offsetLeft: number;
}

function Desktop(props: any) {
    const [state, setstate] = useState<RigidBody[]>([]);

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
            let rbs = MapFilesToRbs(props.files);
            let newFileRb = rbs.find((x) => x.file.fileId === newFile!.fileId)!;
            setstate([...oldRbs, newFileRb]);
        }
    }, [props.files]);

    useEffect(() => {
        setstate(MapFilesToRbs(props.files));
    }, []);

    useEffect(() => {
        if (drag.id != null) {
            let rbs = state.slice();
            rbs = rbs.map((rb: RigidBody) => {
                if (rb.id === drag.id) {
                    rb.pos = {
                        X: props.mouseState.left + drag.offsetLeft,
                        Y: props.mouseState.top + drag.offsetTop,
                    };
                }

                return rb;
            });

            setstate(rbs);
        }
    }, [props.mouseState.top, props.mouseState.left]);

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
            >
                {state.map((rb: any, index: number) => (
                    <DesktopIcon
                        key={index}
                        rb={rb}
                        StartDrag={StartDrag}
                        dragId={drag.id}
                    />
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

export default Desktop;
