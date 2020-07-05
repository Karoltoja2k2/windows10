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
import FileIcon from "../../fileIcon/FileIcon.component";

const Bar = (props: any) => {
	const [search, setSearch] = useState({
		path: props.file.path + props.file.title,
		showResults: false,
		results: Array<File>(),
	});

	useEffect(() => {
		setSearch({
			...search,
			path: props.file.path + props.file.title,
		});
	}, [props.file]);

	const searchFile = (path: string) => {
		if (!path) {
			setSearch({
				...search,
				showResults: false,
				results: [],
			});
			return;
		}
		console.log(path);
		let files = Files.filter((x) =>
			x.title.toLowerCase().includes(path.toLowerCase())
		);
		setSearch({
			...search,
			showResults: true,
			results: files,
		});
	};

	function Navigate(id:number, file:File) {
		setSearch({
			...search,
			showResults: false,
		});
		props.Navigate(id, file)
	}

	return (
		<div className="container__bar">
			<button
				className={
					props.file.prevFolder != null
						? "bar__button bar__button--enabled"
						: "bar__button bar__button--disabled"
				}
				onClick={() => {
					props.previousFolder();
				}}
			>
				<FontAwesomeIcon icon={faArrowLeft} />
			</button>
			<button className="bar__button bar__button--disabled">
				<FontAwesomeIcon icon={faArrowRight} />
			</button>
			<button className="bar__button bar__button--disabled">
				<FontAwesomeIcon icon={faAngleDown} />
			</button>
			<button className="bar__button bar__button--disabled">
				<FontAwesomeIcon icon={faArrowUp} />
			</button>

			<div className="bar__search--drive">
				<div className="search__input">
					<input
						type="text"
						onChange={(e) => {
							console.log(e.target.value);
							searchFile(e.target.value);
						}}
						onKeyDownCapture={(e) => {
							if (e.key === "Enter") {
								searchFile(search.path);
							}
						}}
						placeholder={search.path}
					/>
					<button
						className="bar__button bar__button--enabled"
						onClick={() => {
							setSearch({
								...search,
								showResults: !search.showResults
							})
						}}
					>
						<FontAwesomeIcon icon={faAngleDown} />
					</button>
				</div>
				<div
					className={
						search.showResults
							? "search__results--active search__results"
							: "search__results"
					}
				>
					{search.results.map((result: File, index: number) => (
						<FileIcon
							type="searchResult"
							file={result}
							id={props.id}
							key={index}
							Navigate={Navigate}
						/>
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
