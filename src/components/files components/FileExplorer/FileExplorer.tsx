import React, { useState, useEffect } from "react";
import "./fileExplorer.scss";
import WindowBase from "../WindowBase";
import files from "../../../models/fileStructure2";
import FileIcon from "../../fileIcon/FileIcon";

import { Icon, InlineIcon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import bxSearchAlt from "@iconify/icons-bx/bx-search-alt";

const FileExplorer = (props: any) => {
	var iconsInFolder = files.filter(
		(x) => x.prevFolder && x.prevFolder.fileId === props.file.fileId
	);

	const [data, setData] = useState(props.data);
	const [isRed, setIsRed] = useState(false);

	const previousFolder = () => {
		if (props.file.prevFolder) {
			props.WindowManagement.Navigate(props.id, props.file.prevFolder);
		}
	};

	const searchFile = () => {
		console.log(search.path);
		var file = files.filter(
			(x) => x.title.toLowerCase() === search.path.toLowerCase()
		);
		if (file[0]) {
			props.WindowManagement.Navigate(props.id, file[0]);
		}
	};

	const [search, setSearch] = useState({
		path: props.file.path + props.file.title,
		results: [],
	});

	useEffect(() => {
		console.log(search);
	}, [search]);

	const [path, setPath] = useState(props.file.path + props.file.title);
	useEffect(() => {
		setPath(props.file.path + props.file.title);
	}, [props.file.path, props.file.title]);

	return (
		<WindowBase
			id={props.id}
			file={props.file}
			windowProps={props.windowProps}
			WindowManagement={props.WindowManagement}
		>
			<div
				className="explorerContainer"
				style={{ background: isRed ? "red" : "" }}
			>
				<div className="toolBar">
					<button
						onClick={() => {
							previousFolder();
						}}
					>
						<Icon icon={bxArrowBack} width={22} />
					</button>
					<div className="searchBar">
						<input
							type="text"
							onChange={(e) => {
								setSearch({
									...search,
									path: e.target.value,
								});
							}}
							onKeyDownCapture={(e) => {
								if (e.key === "Enter") {
									searchFile();
								}
							}}
							placeholder={search.path}
						/>
						<div className="results">
							
						</div>
					</div>
				</div>
				<div className="content">
					<div className="otherFolders"></div>

					<div
						className="iconGrid"
						onMouseDown={(e) => {
							e.stopPropagation();
							props.WindowManagement.SetFocusedWin(props.id);
						}}
					>
						{iconsInFolder &&
							iconsInFolder.map((file: any, index: number) => (
								<FileIcon
									file={file}
									id={props.id}
									key={index}
									Navigate={props.WindowManagement.Navigate}
								/>
							))}
						<button
							onClick={() => {
								setIsRed(!isRed);
							}}
						>
							TEST
						</button>
					</div>
				</div>
				<div className="footer"></div>
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
