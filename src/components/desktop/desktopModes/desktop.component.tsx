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

interface DragState2 {
    id: number | null;
    offset: IPoint;
}

interface SelectState2 {
    active: boolean;
    start: IPoint;
    end: IPoint;
    icons: number[];
}

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

    const [select2, setSelect2] = useState<SelectState2>({
        active: false,
        start: Point0,
        end: Point0,
        icons: [],
    });

    const [select, setSelect] = useState<SelectState>({
        active: false,
        start: Point0,
        end: Point0,
        selected: [],
    });

    const [drag2, setDrag2] = useState<Drag[]>([]);

    const [drag, setDrag] = useState<DragState2>({
        id: null,
        offset: Point0,
    });

    function StartDrag(id: number) {
        let rb = state.find((x) => x.id === id)!;
        let offset = SubtractPoints(
            rb.pos,
            Point(props.mouseState.left, props.mouseState.top)
        );
        setDrag({
            id: id,
            offset,
        });

        setSelect2({
            ...select2,
            icons: [id],
        });

        let drag: Drag[] = select.selected.map((id) => {
            return {
                id: id,
                offset: SubtractPoints(
                    state.find((x) => x.id === id)!.pos,
                    Point(props.mouseState.left, props.mouseState.top)
                ),
            };
        });
        if (drag.length > 0) {
            setDrag2(drag);
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
        if (drag.id != null) {
            let rbs = state.slice();
            rbs = rbs.map((rb: RigidBody) => {
                if (rb.id === drag.id) {
                    rb.pos = {
                        X: props.mouseState.left + drag.offset.X,
                        Y: props.mouseState.top + drag.offset.Y,
                    };
                }

                return rb;
            });

            setstate(rbs);
        }
    }, [props.mouseState.top, props.mouseState.left]);

    function HandleSelectChange() {
        let newEnd = Point(props.mouseState.left, props.mouseState.top);
        let focusedIcons: number[] = [];
        state.forEach((rb: RigidBody) => {
            if (PointBetweenPoints(rb.pos, select2.start, newEnd)) {
                focusedIcons.push(rb.id);
            }
        });

        setSelect2({ ...select2, end: newEnd, icons: focusedIcons });
    }

    function CalculateSelect() {
        let start = Point(
            select2.start.X > select2.end.X ? select2.end.X : select2.start.X,
            select2.start.Y > select2.end.Y ? select2.end.Y : select2.start.Y
        );

        let end = Point(
            select2.start.X > select2.end.X ? select2.start.X : select2.end.X,
            select2.start.Y > select2.end.Y ? select2.start.Y : select2.end.Y
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
                    setDrag({ id: null, offset: Point0 });
                    setSelect2({ ...select2, active: false });
                }}
                onMouseLeave={() => {
                    setDrag({ id: null, offset: Point0 });
                }}
                onMouseDown={() =>
                    setSelect2({
                        active: true,
                        start: Point(
                            props.mouseState.left,
                            props.mouseState.top
                        ),
                        end: Point(props.mouseState.left, props.mouseState.top),
                        icons: [],
                    })
                }
                onMouseMove={() => {
                    if (select2.active) {
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
                            select2.icons.find((x) => x === rb.id) != null
                        }
                        dragId={drag.id}
                    />
                ))}
            </div>

            {select2.active && (
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
