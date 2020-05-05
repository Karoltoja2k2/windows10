import React, { useState, useEffect } from 'react'
import '../scss/windowBase.scss'
import FileExplorer from './FileExplorer'
import PhotoDisplay from './PhotoDisplay'

const WindowBase = (props: any) => {

    // WINDOW DRAG
    const [position, setPosition] = useState({
        top: 100,
        left: 100
    })
    const [initOffset, setInitOffset] = useState({
        top: 0,
        left: 0
    })
    const [toolbarLmbDown, setToolbarLmbDown] = useState(false);
    useEffect(() => {
        if (props.lmbDown && toolbarLmbDown) {
            setPosition({
                top: props.position.top - initOffset.top,
                left: props.position.left - initOffset.left
            })
        } else if (props.lmbDown == false && toolbarLmbDown) {
            setToolbarLmbDown(false)
        }
    }, [props.position])

    const [windowContent, setWindowContent] = useState()
    function OpenFile(){
        console.log(props)
        if (props.extension == '.fld'){
            return <FileExplorer file={props}/>
        } else if (props.extension == '.img') {
            return <PhotoDisplay file={props}/>
        }
    }

    return (
        <div className="defaultContainer" style={position}>
            <div className="bar" onMouseDown={(e) => {
                e.preventDefault()
                if (e.button == 0) {
                    setInitOffset({
                        top: e.pageY - position.top,
                        left: e.pageX - position.left
                    })
                    props.setLmbDown(true)
                    setToolbarLmbDown(true)
                }
            }}>

        <label>{props.title}</label>
                <div className="barButtons">
                    <button>_</button>
                    <button>||</button>
                    <button>X</button>
                </div>
            </div>

            {OpenFile()}
        </div>
    );
}

export default WindowBase