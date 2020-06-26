import React, { useState, useEffect } from "react";
import "../scss/windowBase.scss";
import PhotoDisplay from "./PhotoDisplay";
import { Resizable } from "re-resizable";

import { Icon } from "@iconify/react";
import bxX from "@iconify/icons-bx/bx-x";
import bxExitFullscreen from "@iconify/icons-bx/bx-exit-fullscreen";
import bxExpand from "@iconify/icons-bx/bx-expand";
import bxSpaceBar from "@iconify/icons-bx/bx-space-bar";

const WindowBase = (props: any) => {
	useEffect(() => {
		if (drag.dragging && props.WindowManagement.lmbDown) {
			setDimensions({
				...dimensions,
				top: props.WindowManagement.movingPos.top - drag.offset.top,
				left: props.WindowManagement.movingPos.left - drag.offset.left,
			});
		}
	}, [props.WindowManagement.movingPos]);

	useEffect(() => {
		if (!props.WindowManagement.lmbDown) {
			setDrag({
				dragging: false,
				offset: {
					top: 0,
					left: 0,
				},
			});
		}
	}, [props.WindowManagement.lmbDown]);

	useEffect(() => {
		setWindowProps(props.windowProps);
	}, [props.windowProps]);

	const [windowProps, setWindowProps] = useState(props.windowProps);
	const [drag, setDrag] = useState({
		dragging: false,
		offset: {
			top: 0,
			left: 0,
		},
	});

	const [dimensions, setDimensions] = useState({
		top: 100,
		left: 100,
		width: 600,
		height: 400,
	});

	useEffect(() => {
		setWindowProps(props.windowProps);
	}, [props.windowProps]);

	return (
		<Resizable
			className={
				windowProps.isFocused
					? "resizableWindow focused"
					: "resizableWindow"
			}
			minHeight={200}
			minWidth={300}
			enable={{
				top: !windowProps.isFullScreen,
				right: !windowProps.isFullScreen,
				bottom: !windowProps.isFullScreen,
				left: !windowProps.isFullScreen,
				topRight: !windowProps.isFullScreen,
				bottomRight: !windowProps.isFullScreen,
				bottomLeft: !windowProps.isFullScreen,
				topLeft: !windowProps.isFullScreen,
			}}
			size={
				!windowProps.isFullScreen
					? {
							width: dimensions.width,
							height: dimensions.height,
					  }
					: {
							width: "100%",
							height: "100%",
					  }
			}
			style={
				!windowProps.isFullScreen
					? {
							...dimensions,
							position: "absolute",
							zIndex: windowProps.isFocused ? 4 : 3,
							visibility: windowProps.isMinimized
								? "hidden"
								: "visible",
					  }
					: {
							top: 0,
							left: 0,
							position: "absolute",
							zIndex: windowProps.isFocused ? 4 : 3,
							visibility: windowProps.isMinimized
								? "hidden"
								: "visible",
					  }
			}
			onResizeStart={(e) => {
				e.stopPropagation();
				props.WindowManagement.SetFocusedWin(props.id);
			}}
			onResizeStop={(e, direction, ref, d) => {
				setDimensions({
					...dimensions,
					width: dimensions.width + d.width,
					height: dimensions.height + d.height,
				});
			}}
		>
			<div
				className="resizableWindowContainer"
				onMouseDown={(e) => {
					e.stopPropagation();

					props.WindowManagement.SetFocusedWin(props.id);
				}}
				onMouseUp={(e) => {}}
			>
				<div
					className="bar"
					onMouseDown={(e) => {
						e.preventDefault();
						if (e.detail === 2) {
							return;
						}
						console.log("clicked");

						if (
							e.target === e.currentTarget &&
							!windowProps.isFullScreen
						) {
							props.WindowManagement.setLmbDown(true);
							setDrag({
								dragging: true,
								offset: {
									top: e.pageY - dimensions.top,
									left: e.pageX - dimensions.left,
								},
							});
							props.WindowManagement.setMovingWindow({
								...props.WindowManagement,
								id: props.id,
							});
						}
					}}
				>
					<div className="barTitle">
						<img src={props.file.iconsrc} alt="fileIcon" />
						<label>{props.file.title}</label>
					</div>
					<div className="barButtons">
						<button
							className="control"
							onClick={(e) => {
								props.WindowManagement.MinimizeWindow(props.id);
							}}
						>
							<Icon icon={bxSpaceBar} width={24} />
						</button>
						<button
							className="control"
							onClick={(e) => {
								props.WindowManagement.FullScreenMode(props.id);
							}}
						>
							{props.windowProps.isFullScreen ? (
								<Icon icon={bxExitFullscreen} width={20} />
							) : (
								<Icon icon={bxExpand} width={20} />
							)}
						</button>
						<button
							className="exit"
							onClick={(e) => {
								props.WindowManagement.CloseWindow(props.id);
							}}
						>
							<Icon icon={bxX} width={30} />
						</button>
					</div>
				</div>

				{props.children}
			</div>
		</Resizable>
	);
};

export default WindowBase;
