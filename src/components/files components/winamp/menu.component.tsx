import React, { useEffect, useState } from "react";
import winamplogo from "../../../media/images/winamplogo2.png";

import "./menu.scss";

function Menu(props: any) {
    const [dynamicMenu, setDynamicMenu] = useState({
        isDynamic: props.dynamicMenu,
    })
    
    useEffect(() => {
        setDynamicMenu({
            isDynamic: props.dynamicMenu,
        })
    }, [props.dynamicMenu])

    return (
        <div className={`container__menu ${dynamicMenu.isDynamic === true ? 'container__menu--hidden' : ''}`}>
            <div className="menu__logo">
                <img src={winamplogo} alt="winamplogo" />
            </div>
        </div>
    );
}

export default Menu;
