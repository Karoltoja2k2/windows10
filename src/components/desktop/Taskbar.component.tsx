import React from "react";
import TaskBarItem from "./TaskBarItem.component";
import Clock from "../clock/Clock.component";

import "./taskbar.scss";
import Logo from "../../media/win_logo.png";

const Taskbar = (props: any) => {
	return (
		<div className="taskBar">
			<button className="startBtn">
				<img src={Logo} alt="startBtnLogo" />
			</button>

			<div className="taskBarItems">
				{props.openWindows.length > 0 &&
					props.openWindows.map((obj: any, index: number) => (
						<TaskBarItem
							id={obj.id}
							key={obj.id}
							focusedWin={
								obj.windowProps.isFocused ? true : false
							}
							title={obj.file.title}
							iconsrc={obj.file.iconsrc}
							WindowManagement={props.WindowManagement}
						/>
					))}
			</div>
			<div className="toolBar">
				<Clock />
				<button className="minimizeAllBtn"></button>
			</div>
		</div>
	);
};

export default Taskbar;
