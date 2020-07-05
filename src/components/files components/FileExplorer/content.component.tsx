import React, { useState, useEffect } from "react";
import FileIcon from "../../fileIcon/FileIcon.component";
import Files from '../../../models/fileStructure2'
import "./content.scss";

const Content = (props: any) => {

	let files = Files;

	return (
		<div className="container__content">
			<div className="content--left scrollbar--dark">
				{files.map((file: any, index: number) => (
						<FileIcon
							type="inrow"
							file={file}
							id={props.id}
							key={index}
							Navigate={props.Navigate}
						/>
					))}

			</div>

			<div className="content--right scrollbar--dark">
				{props.iconsInFolder &&
					props.iconsInFolder.map((file: any, index: number) => (
						<FileIcon
							type="icon"
							file={file}
							id={props.id}
							key={index}
							Navigate={props.Navigate}
						/>
					))}
			</div>
		</div>
	);
};

export default Content;
