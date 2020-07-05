import React, { useState, useEffect } from "react";
import "./icon.scss";

const FileIcon = (props: any) => {
	function OpenFileEvent(event: any) {
		props.Navigate(props.id, props.file);
	}
	if (props.type === "icon"){
		return (
			<button className="icon" onDoubleClick={(e) => OpenFileEvent(e)}>
				<img src={props.file.iconsrc} alt="fileIcon" />
				<label>{props.file.title}</label>
			</button>
		);
	} else if (props.type === "inrow") {
		return (
			<button>
				<img />
				<label></label>
			</button>
		)
	} else if (props.type === "searchResult") {
		return (
			<button>
				<img />
				<label></label>
			</button>
		)
	} else {
		return <button />;
	}
};

export default FileIcon;
