import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logout } from '../store/user.action';

function _SideBar({ user, logout }) {
	return (
		<section className="side-bar">
			<div className="actions-top">
				<button></button>
				<button></button>
				<button className="fa bell"></button>
				<button className="fa inbox"></button>
				<button className="fa calendar-check"></button>
			</div>
			<button className="see-plans">See plans</button>
			<div className="actions-bottom">
				<button className="fa puzzle-piece"></button>
				<button className="fa user-plus"></button>
				<button className="fa search"></button>
				<button className="fa question"></button>
				<button></button>
			</div>
		</section>
	);
}

function mapStateToProps(state) {
	return {
		user: state.userModule.loggedinUser,
	};
}

const mapDispatchToProps = {
	logout,
};

export const SideBar = connect(mapStateToProps, mapDispatchToProps)(_SideBar)