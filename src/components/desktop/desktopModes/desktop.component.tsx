import React, { useEffect, useState } from "react";
import File from "../../../models/File";
import { useInterval } from "../../common/hooks/useInterval";
import DesktopIcon from "../../common/icons/desktopIcon.component";
import IPoint, {
    SubtractPoints,
    Point,
    Point0,
    PointBetweenPoints,
} from "../../common/Point";
import { MapFilesToRbs } from "./desktop.const";

import "./desktop.scss";
import RigidBody from "./models/RigidBody";

interface Drag {
    id: number;
    offset: IPoint;
}

interface SelectState {
    active: boolean;
    start: IPoint;
    end: IPoint;
    selected: number[];
}

function Desktop(props: any) {
    const [state, setstate] = useState<RigidBody[]>([]);
    const [select, setSelect] = useState<SelectState>({
        active: false,
        start: Point0,
        end: Point0,
        selected: [],
    });

    const [drag, setDrag] = useState<Drag[]>([]);

    function StartDrag(id: number) {
        let selected = select.selected
        if (selected.find(x => x === id) == null){
            selected = [id]
        }

        setSelect({...select, selected})
        let drag: Drag[] = selected.map((id) => {
            return {
                id: id,
                offset: SubtractPoints(
                    state.find((x) => x.id === id)!.pos,
                    Point(props.mouseState.left, props.mouseState.top)
                ),
            };
        });

        if (drag.length > 0) {
            setDrag(drag);
        }
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
        if (drag.length > 0) {
            let rbs = state.slice();
            console.log(drag)
            rbs = rbs.map((rb: RigidBody) => {
                let dragged = drag.find(x => x.id === rb.id)
                if (dragged != null) {
                    rb.pos = {
                        X: props.mouseState.left + dragged.offset.X,
                        Y: props.mouseState.top + dragged.offset.Y,
                    };
                }

                return rb;
            });

            setstate(rbs);
        }
    }, [props.mouseState.top, props.mouseState.left]);

    function HandleSelectChange() {
        let newEnd = Point(props.mouseState.left, props.mouseState.top);
        let selected: number[] = [];
        state.forEach((rb: RigidBody) => {
            if (PointBetweenPoints(rb.pos, select.start, newEnd)) {
                selected.push(rb.id);
            }
        });

        setSelect({ ...select, end: newEnd, selected: selected });
    }

    function CalculateSelect() {
        let start = Point(
            select.start.X > select.end.X ? select.end.X : select.start.X,
            select.start.Y > select.end.Y ? select.end.Y : select.start.Y
        );

        let end = Point(
            select.start.X > select.end.X ? select.start.X : select.end.X,
            select.start.Y > select.end.Y ? select.start.Y : select.end.Y
        );

        let absDims = SubtractPoints(end, start);
        return {
            top: start.Y,
            left: start.X,
            width: absDims.X,
            height: absDims.Y,
        };
    }

    return (
        <div className="desktop">
            <div
                className="desktop__icons"
                onMouseUp={() => {
                    setDrag([]);
                    setSelect({ ...select, active: false });
                }}
                onMouseLeave={() => {
                    setDrag([]);
                }}
                onMouseDown={() =>
                    setSelect({
                        active: true,
                        start: Point(
                            props.mouseState.left,
                            props.mouseState.top
                        ),
                        end: Point(props.mouseState.left, props.mouseState.top),
                        selected: [],
                    })
                }
                onMouseMove={() => {
                    if (select.active) {
                        HandleSelectChange();
                    }
                }}
            >
                {state.map((rb: any, index: number) => (
                    <DesktopIcon
                        key={index}
                        rb={rb}
                        StartDrag={StartDrag}
                        isSelected={
                            select.selected.find((x) => x === rb.id) != null
                        }
                    />
                ))}
            </div>

            {select.active && (
                <div
                    className="desktop__select"
                    style={CalculateSelect()}
                ></div>
            )}

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
