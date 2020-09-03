import React, { useState, useEffect } from "react";
import "./explorer.scss";
import WindowBase from "../../common/windowBase/WindowBase";
import DynamicGrid from "../../common/dynamicGrid/dynamicGrid.component";

const Explorer = (props: any) => {
    const [state, setState] = useState({
        openTabs: [],
    });

    return (
        <WindowBase
            id={props.id}
            file={props.file}
            properties={props.properties}
            mobileMode={props.mobileMode}
        >
            <div className="explorerContainer">
                <iframe
                    style={{ border: "0px" }}
                    src="http://loadx.github.io/html5-wolfenstein3D/"
                />
            </div>
            {/* <DynamicGrid columns={15} rows={15} /> */}
        </WindowBase>
    );
};

export default React.memo(Explorer, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.properties === nextProps.properties &&
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
