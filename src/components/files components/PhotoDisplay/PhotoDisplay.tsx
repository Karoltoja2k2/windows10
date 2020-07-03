import React, { useState, useEffect, memo } from "react";
import WindowBase from "../WindowBase";
import Logo from "../../media/win_logo.png";
import "./photoDisplay.scss";

const PhotoDisplay = (props: any) => {
	return (
		<WindowBase
			id={props.id}
			file={props.file}
			windowProps={props.windowProps}
			WindowManagement={props.WindowManagement}
		>
			<div className="photoContainer">
				<img src={props.file.content.source} />
			</div>
		</WindowBase>
	);
};

export default React.memo(PhotoDisplay, (prevProps, nextProps) => {
	return (
		nextProps.id !== nextProps.WindowManagement.movingPos.id &&
		prevProps.windowProps === nextProps.windowProps
	);
});
