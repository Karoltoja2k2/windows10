import React, { useState, useEffect } from "react";
import WindowBase from "../../common/windowBase/WindowBase";
import PaintApp from "./paintApp.component";
import useSoftExit from "../../common/hooks/useSoftExit";

const Paint = (props: any) => {
    const [file, setFile] = useState(props.file);
    useEffect(() => {
        setFile(props.file);
        console.log(props.file);
    }, [props.file]);

    useSoftExit(props.isClosed, props.id);

    return (
        <WindowBase
            id={props.id}
            file={file}
            properties={props.properties}
            mobileMode={props.mobileMode}
        >
            <PaintApp id={props.id} file={file} setFile={setFile} />
        </WindowBase>
    );
};

export default React.memo(Paint, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.properties === nextProps.properties &&
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
