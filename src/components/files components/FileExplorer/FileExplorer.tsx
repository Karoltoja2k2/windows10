import React, { useState, useEffect } from "react";
import "./fileExplorer2.scss";
import WindowBase from "../WindowBase";
import files from "../../../models/fileStructure2";
import FileIcon from "../../fileIcon/FileIcon";

import {
	faArrowLeft,
	faArrowUp,
	faArrowRight,
	faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Icon, InlineIcon } from "@iconify/react";
import bxArrowBack from "@iconify/icons-bx/bx-arrow-back";
import bxRightArrowAlt from "@iconify/icons-bx/bx-right-arrow-alt";
import bxUpArrowAlt from "@iconify/icons-bx/bx-up-arrow-alt";
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
				className="container"
				style={{ background: isRed ? "red" : "" }}
			>
				<div className="container__bar">
					<button
						onClick={() => {
							previousFolder();
						}}
					>
						<FontAwesomeIcon icon={faArrowLeft} />
					</button>
					<button className="button--enabled">
						<FontAwesomeIcon icon={faArrowRight} />
					</button>
					<button className="button--disabled">
						<FontAwesomeIcon icon={faAngleDown} />
					</button>
					<button>
						<FontAwesomeIcon icon={faArrowUp} />
					</button>
					<div className="bar__search--drive">
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
						<div className="search__results search__results--actve">
							<div className="item" />
						</div>
					</div>

					<div className="bar__search--local">
						<input placeholder="Search"></input>
					</div>
				</div>
				<div className="container__content">
					<div className="content--left"></div>

					<div
						className="content--right"
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
				<div className="container__footer">
					<label>Elements: {iconsInFolder.length}</label>
				</div>
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
