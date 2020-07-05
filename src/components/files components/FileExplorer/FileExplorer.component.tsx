import React, { useState, useEffect } from "react";
import "./fileExplorer.scss";
import WindowBase from "../WindowBase";

import Files from "../../../models/fileStructure2";
import File from "../../../models/File";

import Bar from "./bar.component";
import Content from "./content.component";
import Footer from "./footer.component";

const FileExplorer = (props: any) => {

	// THIS NEED OPTIMALIZATION !!!!!!
	const [filter, setFilter] = useState("");
	const [files, setFiles] = useState(Array<File>());
	useEffect(() => {
		setFiles(
			Files.filter(
				(x) =>
					x.prevFolder &&
					x.prevFolder.fileId === props.file.fileId &&
					x.title.toLowerCase().includes(filter.toLowerCase())
			)
		);
	}, [props.file, filter]);
	// END
	
	const previousFolder = () => {
		if (props.file.prevFolder) {
			props.WindowManagement.Navigate(props.id, props.file.prevFolder);
		}
	};



	return (
		<WindowBase
			id={props.id}
			file={props.file}
			windowProps={props.windowProps}
			WindowManagement={props.WindowManagement}
		>
			<div className="container">
				<Bar
					previousFolder={previousFolder}
					Navigate={props.WindowManagement.Navigate}
					id={props.id}
					file={props.file}
					setFilter={setFilter}
				/>
				<Content
					iconsInFolder={files}
					id={props.id}
					Navigate={props.WindowManagement.Navigate}
				/>
				<Footer iconsCount={files.length} />
			</div>
		</WindowBase>
	);
};
// export default FileExplorer

export default React.memo(FileExplorer, (prevProps, nextProps) => {
	return (
		nextProps.id !== nextProps.WindowManagement.movingPos.id &&
		prevProps.windowProps === nextProps.windowProps
	);
});
