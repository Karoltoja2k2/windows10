import React, { useState, useEffect, memo } from "react";
import WindowBase from "../../common/windowBase/WindowBase";
import Logo from "../../media/win_logo.png";
import "./photoDisplay.scss";

const PhotoDisplay = (props: any) => {
	return (
		<WindowBase
			id={props.id}
			file={props.file}
			state={props.state}
		>
			<div className="photoContainer">
				<img src={`${props.file.content.source}`} />
			</div>
		</WindowBase>
	);
};

export default React.memo(PhotoDisplay, (prevProps, nextProps) => {
    return (
        prevProps.file === nextProps.file &&
        prevProps.state === nextProps.state &&
        nextProps.state.isDragged !== true
    );
});

