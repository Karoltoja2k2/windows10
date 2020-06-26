import { useState, useEffect } from "react"
import React from 'react'


const Clock = () => {

    let date: Date;


    const calcTime = () : string => {
        date = new Date()
        var hours = date.getHours().toString()
        var minutes = date.getMinutes().toString()
        if (minutes.length === 1) {
            minutes = '0' + minutes
        }
        return (hours + ":" + minutes)
    }

    const [time, setTime] = useState(calcTime())

    useEffect(() => {

        setInterval(() => {
            var t = calcTime()
            console.log(t)
            if (t !== time){
                setTime(t);
            }
        }, 5000)
    }, [])

    return (
        <p className="timeContainer">{time}</p>
    );
}

export default Clock