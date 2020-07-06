import React, { useState, useEffect, useCallback } from "react";
import "./desktop.scss";
import FileIcon from "../fileIcon/FileIcon.component";
import Taskbar from "./Taskbar.component";

import Background from "../../media/winxpbg.jpg";

import File from "../../models/File";
import Files from "../../models/fileStructure2";

interface Window {
	id: number;
	windowProps: {
		top?: number;
		left?: number;
		width?: number;
		height?: number;
		isFocused: boolean;
		isMinimized: boolean;
		isFullScreen: boolean;
	};
	file: File;
}

function Desktop() {

	const [smallScreen, setSmallScreen] = useState(
		window.innerWidth < 600 ? true : false
	);
	useEffect(() => {
		if (window.innerWidth < 600 && smallScreen === false) {
			setSmallScreen(true);
		} else {
			setSmallScreen(false);
		}
	}, [window.innerWidth]);

	const path2 = "Drive C:/Desktop/";
	var DesktopIcons2 = Files.filter((x) => x.path === path2);

	const [openWindowsCount, setOpenWindowsCount] = useState(1);
	const [openWindows, setOpenWindows] = useState<Window[]>([
		Win(10, Files[4]),
	]);

	function Win(id: number, file: File): Window {
		return {
			id: id,
			windowProps: {
				isFocused: true,
				isMinimized: false,
				isFullScreen: smallScreen,
			},
			file: {
				...file,
			},
		};
	}

	function Navigate(id: number, fileToOpen: File) {
		var oF;
		if (id === 0 || fileToOpen.extension !== ".fld") {
			oF = Win(openWindowsCount, fileToOpen);
			setOpenWindows([...openWindows, oF]);
			setOpenWindowsCount(openWindowsCount + 1);
		} else {
			var windows = openWindows.slice();
			var window = windows.find((x) => x.id === id)!;
			window.file = { ...fileToOpen };
			setFocusedWin(id);
			setOpenWindows(windows);
		}
	}

	function CloseWindow(id: number) {
		setFocusedWin(0);
		var newList = openWindows.filter((x) => x.id != id);
		setOpenWindows(newList);
	}

	function MinimizeWindow(id: number) {
		var windows = openWindows.slice();
		var window = windows.find((x) => x.id === id)!;
		if (window.windowProps.isFocused && !window.windowProps.isMinimized) {
			window.windowProps = {
				...window.windowProps,
				isMinimized: true,
			};
			setFocusedWin(0);
		} else if (
			!window.windowProps.isFocused &&
			!window.windowProps.isMinimized
		) {
			setFocusedWin(id);
		} else if (window.windowProps.isMinimized) {
			window.windowProps = {
				...window.windowProps,
				isMinimized: false,
			};
			setFocusedWin(id);
		}
		setOpenWindows(windows);
	}
	function FullScreenMode(id: number) {
		var windows = openWindows.slice();
		var window = windows.find((x) => x.id === id)!;
		windows.forEach(function (win) {
			if (win.id === id) {
				window.windowProps = {
					...window.windowProps,
					isFullScreen: !window.windowProps.isFullScreen,
					isFocused: true,
				};
			} else {
				window.windowProps = {
					...window.windowProps,
					isFocused: false,
				};
			}
		});
		console.log(window.windowProps);
		setOpenWindows(windows);
	}

	function setFocusedWin(id: number) {
		var windows = openWindows.slice();
		windows.forEach(function (win) {
			if (win.id === id) {
				win.windowProps = {
					...win.windowProps,
					isFocused: true,
				};
			} else {
				win.windowProps = {
					...win.windowProps,
					isFocused: false,
				};
			}
		});
		setOpenWindows(windows);
	}

	const [lmbDown, setLmbDown] = useState(false);
	const [movingWindow, setMovingWindow] = useState({
		top: 0,
		left: 0,
		id: 0,
	});

	const WindowManagement = {
		SetFocusedWin: setFocusedWin,
		setLmbDown: setLmbDown,
		setMovingWindow: setMovingWindow,
		movingPos: movingWindow,
		lmbDown: lmbDown,
		Navigate: Navigate,
		CloseWindow: CloseWindow,
		MinimizeWindow: MinimizeWindow,
		FullScreenMode: FullScreenMode,
	};

	function RenderWindow(window: Window) {
		return (
			<window.file.component
				key={window.id}
				file={window.file}
				id={window.id}
				windowProps={window.windowProps}
				WindowManagement={WindowManagement}
				openWindowsCount={openWindowsCount}
			/>
		);
	}

	return (
		<div
			className="desktop"
			id="desktop"
			onMouseDown={() => {
				setFocusedWin(0);

			}}
			onMouseUp={() => {
				setLmbDown(false);
			}}
			onMouseMove={(e) => {
				if (lmbDown) {
					console.log("moving");
					setMovingWindow({
						...movingWindow,
						top: e.pageY,
						left: e.pageX,
					});
				}
			}}
		>
			<img src={Background} className="desktopBackground" />
			<div className="iconGrid">
				{openWindows.length > 0 &&
					openWindows.map((obj: Window, index: number) =>
						RenderWindow(obj)
					)}
				{DesktopIcons2.map((obj: any, index: number) => (
					<FileIcon
						type="icon"
						Navigate={Navigate}
						file={obj}
						id={0}
						key={index}
					/>
				))}
			</div>

			<div className="activateWindows">
				<p className="top">Aktywuj system Windows</p>
				<p className="down">
					Przejdź do ustawień, aby aktywować system Windows.
				</p>
			</div>

			<Taskbar
				openWindows={openWindows}
				WindowManagement={WindowManagement}
			/>
		</div>
	);
}

export default Desktop;
