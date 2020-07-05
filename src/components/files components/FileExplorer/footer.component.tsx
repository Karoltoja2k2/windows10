import React, { useState, useEffect } from "react";

import "./footer.scss";

const Footer = (props: any) => {
	return (
		<div className="container__footer">
			<label>Elements: {props.iconsCount}</label>
			<div className="footer__buttons">
				<button>
					<i className="fas fa-list"></i>
				</button>
				<button>
					<i className="fas fa-th"></i>
				</button>
			</div>
		</div>
	);
};

export default Footer;
