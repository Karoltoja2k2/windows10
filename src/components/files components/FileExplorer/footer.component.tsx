import React, { useState, useEffect } from "react";

import "./footer.scss";

const Footer = (props: any) => {

	function setIconDisplay(value: string) {
		props.setIconDisplay(value);
	}

	return (
		<div className="container__footer">
			<label>Elements: {props.iconsCount}</label>
			<div className="footer__buttons">
				<button
					className={props.iconDisplay === "inrow" ? "footer__buttons-selected" : ""}
					onClick={() => {
						setIconDisplay("inrow");
					}}
				>
					<i className="fas fa-list"></i>
				</button>
				<button
					className={props.iconDisplay === "folderIcon" ? "footer__buttons-selected" : ""}
					onClick={() => {
						setIconDisplay("folderIcon");
					}}
				>
					<i className="fas fa-th"></i>
				</button>
			</div>
		</div>
	);
};

export default Footer;
