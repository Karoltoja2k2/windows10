import React, { useState, useEffect } from "react";
import "../scss/explorer.scss";
import WindowBase from "./WindowBase";

const Explorer = (props: any) => {
	return (
		<WindowBase
			id={props.id}
			file={props.file}
			windowProps={props.windowProps}
			WindowManagement={props.WindowManagement}
		>
			<div className="explorerContainer">
				<iframe src="http://www.youtube.com/embed/W7qWa52k-nE" />
			</div>
		</WindowBase>
	);
};

export default Explorer;
