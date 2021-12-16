import React from 'react';
import './styles.css';
import { NavLink } from "react-router-dom";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function SideNav(props) {

	const [show, setShow] = React.useState("none");
	const [showSandwich, setShowSandwich] = React.useState("");

	const showModal = () => {
		setShow("block");
		setShowSandwich("none");
	};

	const closeModal = () => {
		setShow("none");
		setShowSandwich("block");
	}

	return (
		<>
			<div className="sidenav-parent">
				<NavLink to="/all-coins" className="link" activeClassName="activee">
					<div className="sidenav-item">
						<i class="bi bi-coin"></i>&nbsp;
						All Coins
					</div>
				</NavLink>
				<NavLink to="/prediction" className="link" activeClassName="activee">
					<div className="sidenav-item">
						<i class="bi bi-graph-up-arrow"></i>&nbsp;
						Predictions
					</div>
				</NavLink>
				<NavLink to="/guide" className="link" activeClassName="activee">
					<div className="sidenav-item">
						<i class="bi bi-lightbulb"></i>&nbsp;
						Guide
					</div>
				</NavLink>
				<NavLink to="/news" className="link" activeClassName="activee">
					<div className="sidenav-item">
						<i class="bi bi-newspaper"></i>&nbsp;
						News
					</div>
				</NavLink>
				<NavLink to="/about" className="link" activeClassName="activee">
					<div className="sidenav-item">
						<i class="bi bi-info-circle"></i>&nbsp;
						About
					</div>
				</NavLink>
			</div>

			<div className="sidenav-parent-responsive">
				<div className="sandwich" onClick={showModal} style={{ display: showSandwich }}>
					<FontAwesomeIcon icon={faBars} className="hamburger-icon" />
				</div>
				<div className="modal-sidebar" style={{ display: show }}>
					<span className="close" onClick={closeModal}>&times;</span>
					<NavLink to="/all-coins" className="link">
						<div className="sidenav-item">
							<i class="bi bi-coin"></i>&nbsp;
							All Coins
						</div>
					</NavLink>
					<NavLink to="/prediction" className="link">
						<div className="sidenav-item">
							<i class="bi bi-graph-up-arrow"></i>&nbsp;
							Predictions
						</div>
					</NavLink>
					<NavLink to="/guide" className="link">
						<div className="sidenav-item">
							<i class="bi bi-lightbulb"></i>&nbsp;
							Guide
						</div>
					</NavLink>
					<NavLink to="/news" className="link">
						<div className="sidenav-item">
							<i class="bi bi-newspaper"></i>&nbsp;
							News
						</div>
					</NavLink>
					<NavLink to="/about" className="link">
						<div className="sidenav-item">
							<i class="bi bi-info-circle"></i>&nbsp;
							About
						</div>
					</NavLink>
				</div>
			</div>
		</>
	);
}