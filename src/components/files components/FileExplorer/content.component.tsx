import React, { useState, useEffect } from "react";
import FileIcon from "../../fileIcon/FileIcon.component";
import "./content.scss";

const Content = (props: any) => {
	return (
		<div className="container__content">
			<div className="content--left"></div>

			<div className="content--right">
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
