import { useState } from "react";
import React from "react";

import "./clock.scss";
import { useInterval } from "../hooks/useInterval";

interface DateTime {
    time: string;
    date: string;
}

const Clock = () => {
    const [dateTime, setDateTime] = useState(calcDateTime());

    function calcDateTime(): DateTime {
        let date = new Date();
        return {
            time: `${FormatValue(date.getHours())}:${FormatValue(
                date.getMinutes()
            )}`,
            date: `${FormatValue(date.getDate())}.${FormatValue(
                date.getMonth() + 1
            )}.${FormatValue(date.getFullYear())}`,
        };
    }

    function FormatValue(value: number): string {
        let stringified = value.toString();
        return stringified.length === 1 ? "0" + stringified : stringified;
    }

    useInterval(() => {
        var t = calcDateTime();
        if (t !== dateTime) {
            setDateTime(t);
        }
    }, 1000)

    return (
        <div className="clock">
            <div className="clock__item">{dateTime.time}</div>
            <div className="clock__item">{dateTime.date}</div>
        </div>
    );
};

export default React.memo(Clock);
