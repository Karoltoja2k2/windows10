import React, { useState, useEffect, memo, useRef } from "react";
import WindowBase from "../../common/windowBase/WindowBase";
import Logo from "../../media/win_logo.png";
import PaintContent from "./paintContent.component";
import IMAGE from "../../../media/bg.jpg";
import { Provider, useDispatch, useSelector } from "react-redux";
import PaintSettings from "./paintSettings.component";
import { OverwriteContent, CreateFile } from "../../../actions/driveActions";
import CreateFileDto from "../../../models/CreateFileDto";
import { RootState } from "../../../reducers";
import File from "../../../models/File";
import Content from "../FileExplorer/content.component";

const PaintApp = (props: any) => {
    const imgRef = useRef<HTMLImageElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const drive: File[] = useSelector((state: RootState) => state.driveReducer);
    const dispatch = useDispatch();

    function HandleImageOnLoad() {
        let img = imgRef.current!;
        setState({
            ...state,
            img: img,
            width: img.width,
            height: img.height,
        });
    }

    function OverwriteFile() {
        if (props.file.content?.file) {
            var canvas = canvasRef.current!;
            var img = canvas.toDataURL("image/jpg");
            dispatch(
                OverwriteContent(
                    { source: img },
                    props.file.content.file.fileId
                )
            );
        }
    }

    function SaveFile(title: string) {
        let fileId = Math.max(...drive.map((x) => x.fileId)) + 1;
        var canvas = canvasRef.current!;
        var img = canvas.toDataURL("image/jpg");
        let createFileDto: CreateFileDto = {
            fileId: fileId,
            path: "Drive C:/Desktop/",
            componentId: 3,
            title: title,
            prevFolderId: 1,
            content: {
                source: img,
            },
        };
        dispatch(CreateFile(createFileDto));
        props.setFile({
            ...props.file,
            content: {
                file: {
                    fileId: fileId,
                    path: createFileDto.path,
                    title: createFileDto.title,
                    content: createFileDto.content,
                },
            },
        });
    }

    const FileManagement = {
        OverwriteFile,
        SaveFile,
        id: props.id,
        file: props.file,
    };

    const [state, setState] = useState({
        file: props.file,
        threadedFile: props.file.content?.file,
        imgSource: props.file.content?.file.content?.source,
        img: imgRef.current,
        setup:
            props.file.content?.file.content?.source !== undefined
                ? false
                : true,
        width: 600,
        height: 400,
    });
    return (
        <div className="">
            <PaintContent
                canvasWidth={state.width}
                canvasHeight={state.height}
                img={state.img}
                left={props.left}
                top={props.top}
                canvasRef={canvasRef}
                FileManagement={FileManagement}
            />

            {state.setup && <PaintSettings setState={setState} state={state} />}
            {state.imgSource && (
                <img
                    style={{
                        display: "none",
                        position: "absolute",
                    }}
                    src={state.imgSource}
                    ref={imgRef}
                    onLoad={() => {
                        HandleImageOnLoad();
                    }}
                />
            )}
        </div>
    );
};

export default PaintApp;
