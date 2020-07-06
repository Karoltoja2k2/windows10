import React, { useState, useEffect } from "react";
import "./snake.scss";

import WindowBase from "../WindowBase";

const Snake = (props: any) => {
	let array = [10, 15, 121, 2, 1, 3, 21, 312, 4, 12, 4, 12, 4];

	const style = {
		"grid-template-columns": `repeat(${10}, ${20}px)`,
		"grid-template-rows": `repeat(${10}, ${20}px)`,
	};

	return (
		<WindowBase
			id={props.id}
			file={props.file}
			windowProps={props.windowProps}
			WindowManagement={props.WindowManagement}
		>
			<div className="snake__container">
				{array.map((res) => (
					<div className="row" style={{ height: 30 }}>
						{array.map((res) => (
							<div className="item" style={{ width: 30 }} />
						))}
					</div>
				))}
			</div>
		</WindowBase>
	);
};

export default Snake;
