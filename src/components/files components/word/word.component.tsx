import React, { useState } from "react";
import WindowBase from "../../common/windowBase/WindowBase";

import "./word.scss";
import "../../common/scrollbar--dark.scss";
import Editor from "./editor.component";
import useSoftExit from "../../common/hooks/useSoftExit";

function Word(props: any) {
    const [state, setState] = useState({
        disabled: props.file.content?.text != null,
        text: props.file.content?.text,
    });

    useSoftExit(props.isClosed, props.id);

    return (
        <WindowBase
            id={props.id}
            file={props.file}
            properties={{...props.properties}}
            mouseState={props.mouseState}
            mobileMode={props.mobileMode}
        >
            <Editor disabled={state.disabled} text={state.text} />
        </WindowBase>
    );
}

export default React.memo(Word, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.file.content?.source === nextProps.file.content?.source &&
        prevProps.properties === nextProps.properties &&
        (prevProps.mouseState === nextProps.mouseState ||
            nextProps.properties.isDragged !== true) &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
