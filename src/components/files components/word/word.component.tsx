import React, { useEffect, useState } from "react";
import WindowBase from "../../common/windowBase/WindowBase";
import RichTextEditor from "react-rte";

import "./word.scss";
import "../../common/scrollbar--dark.scss";
import Editor from "./editor.component";
import { useDispatch } from "react-redux";
import { FinishCloseWindow } from "../../../actions/windowsActions";

function Word(props: any) {
    const [state, setState] = useState({
        disabled: props.file.content?.text != null,
        text: props.file.content?.text,
    });

    const dispatch = useDispatch();
    useEffect(() => {
        if (props.isClosed) {
            dispatch(FinishCloseWindow(props.id));
        }
    }, [props.isClosed]);

    return (
        <WindowBase
            id={props.id}
            file={{ ...props.file }}
            windowBaseStyle="word"
            properties={{ ...props.properties, minWidth: 500, minHeight: 300 }}
            mobileMode={props.mobileMode}
        >
            <Editor disabled={state.disabled} text={state.text}/>
        </WindowBase>
    );
}

export default React.memo(Word, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.file.content?.source === nextProps.file.content?.source &&
        prevProps.properties === nextProps.properties &&
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
