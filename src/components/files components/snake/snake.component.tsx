import React, { useState, useEffect } from "react";
import "./snake.scss";

import WindowBase from "../WindowBase";
import Game from "./game.component"
// import Field from "./field.component"



const Snake = (props: any) => {

	return (
		<WindowBase
			id={props.id}
			file={props.file}
			windowProps={props.windowProps}
			WindowManagement={props.WindowManagement}
		>
			<Game />
		</WindowBase>
	);
};

export default Snake;
