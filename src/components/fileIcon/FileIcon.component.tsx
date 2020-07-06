import React, { useState, useEffect } from "react";
import "./icon.scss";

const FileIcon = (props: any) => {

	if (props.type === "icon"){
		return (
			<button className="icon" onDoubleClick={() => props.Navigate(props.id, props.file)}>
				<img src={props.file.iconsrc} />
				<label>{props.file.title}</label>
			</button>
		);
	} else if (props.type === "inrow") {
		return (
			<button className="inrow" onDoubleClick={() => props.Navigate(props.id, props.file)}>
				<img src={props.file.iconsrc}/>
				<label>{props.file.title}</label>
			</button>
		)
	} else if (props.type === "searchResult") {
		return (
			<button className="searchResult" onClick={() => props.Navigate(props.id, props.file)}>
				<img />
				<label>{props.file.path + props.file.title}</label>
			</button>
		)
	} else {
		return <button />;
	}
};

export default FileIcon;
