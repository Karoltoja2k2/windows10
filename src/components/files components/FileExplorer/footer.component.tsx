import React, { useState, useEffect } from "react";

import './footer.scss'


const Footer = (props: any) => {
	return (
		<div className="container__footer">
			<label>Elements: {props.iconsCount}</label>
		</div>
	);
};

export default Footer;
