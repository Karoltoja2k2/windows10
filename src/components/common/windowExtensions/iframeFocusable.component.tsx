import React from "react";
import { useDispatch } from "react-redux";
import { FocusWindow } from "../../../actions/windowsActions";

function IframeFocusable(props: any) {
    const dispatch = useDispatch();
    return (
        <div>
            {!props.isFocused && (
                <div
                    style={{
                        top: 30,
                        left: 1,
                        right: 1,
                        bottom: 1,
                        position: "absolute",
                        zIndex: 4,
                    }}
                    onMouseDown={() => {
                        dispatch(FocusWindow(props.id));
                    }}
                ></div>
            )}
        </div>
    );
}

export default IframeFocusable;
