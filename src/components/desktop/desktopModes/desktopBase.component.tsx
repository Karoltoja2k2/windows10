import React, { Children, useEffect, useState } from "react";
import DesktopIcon from "../../common/icons/desktopIcon.component";
import {
    Point0,
    SubtractPoints,
    Point,
    PointBetweenPoints,
} from "../../common/Point";
import { CalculateSelect } from "./desktop.const";
import RigidBody from "./models/RigidBody";
import SelectState from "./models/SelectState";

function DesktopBase(props: any) {
    const [isDragging, setIsDragging] = useState(false);
    const [select, setSelect] = useState<SelectState>({
        active: false,
        start: Point0,
        end: Point0,
        selected: [],
    });

    useEffect(() => {
        if (isDragging) {
            let rbs = props.rbs.map((rb: RigidBody) => {
                if (rb.drag != null) {
                    rb.pos = {
                        X: props.mouseState.left + rb.drag.offset.X,
                        Y: props.mouseState.top + rb.drag.offset.Y,
                    };
                }

                return rb;
            });

            props.setRbs(rbs);
        }
    }, [props.mouseState.top, props.mouseState.left]);

    function StartDrag(id: number) {
        setIsDragging(true);
        let selected = select.selected;
        if (selected.find((x) => x === id) == null) {
            selected = [id];
        }

        let rbs = props.rbs.slice();
        let newRbs = rbs.map((rb: RigidBody) => {
            return selected.find((x) => x === rb.id) != null
                ? {
                      ...rb,
                      drag: {
                          id: rb.id,
                          offset: SubtractPoints(
                              rb.pos,
                              Point(props.mouseState.left, props.mouseState.top)
                          ),
                      },
                  }
                : rb;
        });

        props.setRbs(newRbs);
        setSelect({ ...select, selected });
    }

    function EndDrag() {
        if (isDragging) {
            setIsDragging(false);
            let rbs = props.rbs.map((rb: RigidBody) => {
                return {
                    ...rb,
                    drag: null,
                };
            });

            props.setRbs(rbs);
        }
    }

    function HandleSelectChange() {
        let newEnd = Point(props.mouseState.left, props.mouseState.top);
        let selected: number[] = [];
        props.rbs.forEach((rb: RigidBody) => {
            if (PointBetweenPoints(rb.pos, select.start, newEnd)) {
                selected.push(rb.id);
            }
        });

        setSelect({ ...select, end: newEnd, selected: selected });
    }

    const DesktopManager = {
        ...props,
        isDragging: isDragging,
        setIsDragging: setIsDragging,
        select: select,
        setSelect: setSelect,
        StartDrag: StartDrag,
        EndDrag: EndDrag,
        HandleSelectChange: HandleSelectChange,
    };

    return (
        <div className="desktop">
            {React.cloneElement(props.children, {...DesktopManager})}

            <div
                className="desktop__icons"
                onMouseUp={() => {
                    EndDrag();
                    setSelect({ ...select, active: false });
                }}
                onMouseLeave={() => {
                    EndDrag();
                    setSelect({ ...select, active: false });
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
                {props.rbs.map((rb: any, index: number) => (
                    <DesktopIcon
                        key={index}
                        rb={rb}
                        StartDrag={StartDrag}
                        isSelected={
                            select.selected.find((x: number) => x === rb.id) !=
                            null
                        }
                    />
                ))}
            </div>

            {select.active && (
                <div
                    className="desktop__select"
                    style={CalculateSelect(select)}
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

export default DesktopBase
