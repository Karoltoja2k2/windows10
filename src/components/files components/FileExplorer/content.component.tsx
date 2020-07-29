import React, { useState, useEffect } from "react";
import FileIcon from "../../fileIcon/FileIcon.component";
import Files from '../../../models/fileStructure2'
import "./content.scss";


const Content = (props: any) => {
	let files = Files;
	return (
		<div className="container__content">
			<div className="content__left scrollbar--dark">
				{files.map((file: any, index: number) => (
						<FileIcon
							type="inrow"
							file={file}
							id={props.id}
							key={index}
						/>
					))}

			</div>

			<div className={`content__right--${props.iconDisplay} scrollbar--dark`}>
				{props.iconsInFolder &&
					props.iconsInFolder.map((file: any, index: number) => (
						<FileIcon
							type={props.iconDisplay}
							file={file}
							id={props.id}
							key={index}
						/>
					))}
			</div>
		</div>
	);
};

export default Content;
