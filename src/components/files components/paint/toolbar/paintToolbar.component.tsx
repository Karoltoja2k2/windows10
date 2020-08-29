import React, { useState } from "react";
import "./paintToolbar.scss";
import ToolbarTools from "./tools/toolbarTools.component";
import ToolbarFile from "./file/toolbarFile.component";

enum Tab {
    File = 1,
    Tools,
    ViewSettings,
}

const PaintToolbar = (props: any) => {
    const [openTab, setOpenTab] = useState(Tab.Tools);

    function RenderOpenTab() {
        switch (openTab) {
            case Tab.File:
                return <ToolbarFile FileManagement={props.FileManagement} />;
            case Tab.Tools:
                return (
                    <ToolbarTools
                        tools={props.tools}
                        activeTool={props.activeTool}
                        SetTool={props.SetTool}
                        SetColor={props.SetColor}
                        SetThickness={props.SetThickness}
                        UndoAction={props.UndoAction}
                    />
                );
            case Tab.ViewSettings:
                return <div className=""></div>;
        }
    }

    return (
        <div className="">
            <div className="container__toolbar">
                <div className="toolbar__bookmarks">
                    <div
                        className={
                            openTab === Tab.File
                                ? "bookmark--blue"
                                : "bookmark--classic"
                        }
                        onClick={() => {
                            setOpenTab(Tab.File);
                        }}
                    >
                        File
                    </div>
                    <div
                        className={
                            openTab === Tab.Tools
                                ? "bookmark--blue"
                                : "bookmark--classic"
                        }
                        onClick={() => {
                            setOpenTab(Tab.Tools);
                        }}
                    >
                        Tools
                    </div>
                    <div
                        className={
                            openTab === Tab.ViewSettings
                                ? "bookmark--blue"
                                : "bookmark--classic"
                        }
                        onClick={() => {
                            setOpenTab(Tab.ViewSettings);
                        }}
                    >
                        View settings
                    </div>
                </div>

                {RenderOpenTab()}
            </div>
        </div>
    );
};

export default PaintToolbar;
