import React, { useEffect, useState } from "react";
import WindowBase from "../../common/windowBase/WindowBase";
import "./winamp.scss";
import { useDispatch, useSelector } from "react-redux";
import WinampApp from "./winampApp.component";
import FileRegistry from "../../system/FileRegistry";
import { RootState } from "../../../reducers";
import File from "../../../models/File";
import { MapSongsToAlbums } from "./winamp.const";
import Game from "../snake/game.component";
import WinampLoader from "./winampLoader.component";

function Winamp(props: any) {
    return (
        <WindowBase
            id={props.id}
            windowBaseStyle="winamp"
            file={{ ...props.file, title: "Winamp" }}
            properties={{ ...props.properties, minWidth: 500, minHeight: 300 }}
            mobileMode={props.mobileMode}
        >
            <WinampLoader
                id={props.id}
                file={props.file}
                isClosed={props.isClosed}
                properties={props.properties}
                mobileMode={props.mobileMode}
            />
        </WindowBase>
    );
}

export default React.memo(Winamp, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.isClosed === nextProps.isClosed &&
        prevProps.file.content?.source === nextProps.file.content?.source &&
        prevProps.properties === nextProps.properties &&
        nextProps.properties.isDragged !== true &&
        prevProps.mobileMode === nextProps.mobileMode
    );
});
