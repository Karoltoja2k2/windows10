import React, { useState, useEffect } from 'react'
import '../scss/windowBase.scss'
import FileExplorer from './FileExplorer'
import PhotoDisplay from './PhotoDisplay'
import { Resizable } from "re-resizable";



const WindowBase = (props: any) => {

    const [style, setStyle] = useState(props.openFile.style)
    useEffect(() => {
        setStyle(props.openFile.style)
    }, [props.openFile.style])

    function OpenFile() {
        if (props.openFile.file.extension == '.fld') {
            return <FileExplorer openFile={props.openFile} Navigate={props.fnc.Navigate} />
        } else if (props.openFile.file.extension == '.img') {
            return <PhotoDisplay openFile={props.openFile} />
        }
    }

    const styleTest = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "solid 1px #ddd",
        background: "red"
    };
    const [width, setWidth] = React.useState(300);
    const [height, setHeight] = React.useState(200);

    return (
            <div
                className="defaultContainer"
                style={style}
                onMouseDown={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    console.log(e.target)
                    props.fnc.setFocusedWin(props.openFile.id)
                    console.log(e.currentTarget.offsetHeight)
                }}
                onMouseUp={(e) => {
                    console.log('asd')
                }}
            >


                <div
                    className="bar"
                    onMouseDown={(e) => {
                        e.preventDefault();
                        if (e.target === e.currentTarget) {
                            props.fnc.setMovingWin(props.openFile.id);
                            props.fnc.setOffset({
                                top: e.pageY - style.top,
                                left: e.pageX - style.left
                            })
                        }

                    }}
                    onDoubleClick={(e) => {
                        if (e.target === e.currentTarget) {
                            props.fnc.FullScreenMode(props.openFile)
                        }
                    }}
                >
                    <label>{props.openFile.file.title}</label>
                    <div className="barButtons">
                        <button onClick={(e) => { props.fnc.MinimizeWindow(props.openFile) }}>
                            _
                        </button>
                        <button onClick={(e) => { props.fnc.FullScreenMode(props.openFile) }}>
                            ||
                        </button>
                        <button onClick={(e) => { props.fnc.CloseWindow(props.openFile) }}>
                            X
                        </button>
                    </div>
                </div>

                {OpenFile()}
            </div>
    );
}

export default WindowBase