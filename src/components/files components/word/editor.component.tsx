import React, { useState } from "react";
import RichTextEditor from "react-rte";

import "./word.scss";
import "../../common/scrollbar--dark.scss";

function Editor(props: any) {
    const [state, setState] = useState(
        RichTextEditor.createValueFromString(props.text || "", "html")
    );
    const HandleChange = (value: any) => {
        setState(value);
    };

    const styles = {
        toolbarStyle: {
            display: props.disabled ? "none" : "block",
        },
        editorStyle: {
            paddingTop: props.disabled ? 0 : 80,
        },
    };

    return (
        <div className="word__container">
            <div className="container__editor">
                <RichTextEditor
                    value={state}
                    onChange={HandleChange}
                    disabled={props.disabled}
                    toolbarStyle={styles.toolbarStyle}
                    editorStyle={styles.editorStyle}
                    editorClassName="editorClassName"
                    toolbarClassName="toolbarClassName"
                    className="rootClassName"
                />
            </div>
        </div>
    );
}

export default Editor;
