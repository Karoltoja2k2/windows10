import React from "react";
import DesktopIcon from "../../common/icons/desktopIcon.component";

import './desktop.scss'

function Desktop(props: any) {
    return (
        <div className="desktop">
            <div className="desktop__icons">
                {props.files.map((obj: any, index: number) => (
                    <DesktopIcon file={obj} key={index} />
                ))}
            </div>

            <div className="desktop__activate">
                <p className="top">Aktywuj system Windows</p>
                <p className="down">
                    Przejdź do ustawień, aby aktywować system Windows.
                </p>
            </div>
        </div>
    );
}

export default Desktop;
