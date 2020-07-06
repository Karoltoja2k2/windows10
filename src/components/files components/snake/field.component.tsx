import React, { useState, useEffect } from "react";
import './snake.scss'

const Field = (props: any) => {

    return (
        <div className={props.style} style={{ 
            gridColumn: props.field.cords.X,
            gridRow: props.field.cords.Y,
        }} />
    )
}

export default Field;
