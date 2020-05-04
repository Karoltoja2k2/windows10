import React from 'react';
import '../scss/icon.scss'
import test from '../media/logo192.png';


const Icon = () => {
    return(
        <div className="icon">
            <div className="bg"></div>
            <img src={ test } />
            <label>Mineswepper</label>
        </div>
    );
}

export default Icon