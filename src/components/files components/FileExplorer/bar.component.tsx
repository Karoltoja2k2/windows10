import React, { useState, useEffect } from "react";

import "./bar.scss";
import Files from "../../../models/fileStructure2";
import File from "../../../models/File";

import {
	faArrowLeft,
	faArrowUp,
	faArrowRight,
	faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Bar = (props: any) => {
	const [search, setSearch] = useState({
		path: props.file.path + props.file.title,
		results: Array<File>(),
	});

	useEffect(() => {
		setSearch({
			...search,
			path: props.file.path + props.file.title,
		});
	}, [props.file]);

	const searchFile = (path: string) => {
		console.log(path);
		let files = Files.filter((x) =>
			x.title.toLowerCase().includes(path.toLowerCase())
		);
		if (files.length > 0) {
			setSearch({
				...search,
				results: files,
			});
		}
		console.log(files);
	};

	return (
		<div className="container__bar">
			<button
				className={
					props.file.prevFolder != null
						? "button--enabled"
						: "button--disabled"
				}
				onClick={() => {
					props.previousFolder();
				}}
			>
				<FontAwesomeIcon icon={faArrowLeft} />
			</button>
			<button className="button--disabled">
				<FontAwesomeIcon icon={faArrowRight} />
			</button>
			<button className="button--disabled">
				<FontAwesomeIcon icon={faAngleDown} />
			</button>
			<button className="button--disabled">
				<FontAwesomeIcon icon={faArrowUp} />
			</button>

			<div className="bar__search--drive">
				<input
					type="text"
					onChange={(e) => {
						searchFile(e.target.value);
					}}
					onKeyDownCapture={(e) => {
						if (e.key === "Enter") {
							searchFile(search.path);
						}
					}}
					placeholder={search.path}
				/>
				<div
					className={
						search.results.length > 0
							? "search__results--active search__results"
							: "search__results"
					}
				>
					{search.results.map((result) => (
						<button className="results__item">
							<label className="">{result.title}</label>
						</button>
					))}
				</div>
			</div>

			<div className="bar__search--local">
				<input
					type="text"
					onChange={(e) => {
						props.setFilter(e.target.value);
					}}
					placeholder="Search"
				></input>
			</div>
		</div>
	);
};

export default Bar;
