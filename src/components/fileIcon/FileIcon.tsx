import React, { useState, useEffect } from "react";
import "./icon.scss";

const FileIcon = (props: any) => {
	function OpenFileEvent(event: any) {
		props.Navigate(props.id, props.file);
	}
	return (
		<button className="icon" onDoubleClick={(e) => OpenFileEvent(e)}>
			<img src={props.file.iconsrc} alt="fileIcon" />
			<label>{props.file.title}</label>
		</button>
	);
};

export default FileIcon;
