import React, { useState, useEffect } from 'react'
import '../scss/windowBase.scss'
import FileExplorer from './FileExplorer'
import PhotoDisplay from './PhotoDisplay'
import { Resizable } from "re-resizable";


const WindowBase = (props: any) => {
    console.log(props)
    const [style, setStyle] = useState(props.style)

    useEffect(() => {
        setStyle(props.style)
    }, [props.style])

    return (
        <Resizable
            className="resizableWindow"
            size={{ width: style.width, height: style.height }}
            style={style}
            onResizeStop={(e, direction, ref, d) => {
                props.WindowManagement.SetStyle(props.id, {
                    ...style,
                    width: style.width + d.width,
                    height: style.height + d.height
                })
            }}
        >

            <div
                className="resizableWindowContainer"
                onMouseDown={(e) => {
                    e.stopPropagation()
                    e.preventDefault()
                    props.WindowManagement.setFocusedWin(props.id)
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
                            props.WindowManagement.setMovingWin(props.id);
                            props.WindowManagement.setOffset({
                                top: e.pageY - style.top,
                                left: e.pageX - style.left
                            })
                        }

                    }}
                    onDoubleClick={(e) => {
                        if (e.target === e.currentTarget) {
                            props.WindowManagement.FullScreenMode(props.id)
                        }
                    }}
                >
                    <label>{props.title}</label>
                    <div className="barButtons">
                        <button onClick={(e) => { props.WindowManagement.MinimizeWindow(props.id) }}>
                            _
                        </button>
                        <button onClick={(e) => { props.WindowManagement.FullScreenMode(props.id) }}>
                            ||
                        </button>
                        <button onClick={(e) => { props.WindowManagement.CloseWindow(props.id) }}>
                            X
                        </button>
                    </div>
                </div>

                {props.children}
            </div>

        </Resizable>
    );
}

export default WindowBase