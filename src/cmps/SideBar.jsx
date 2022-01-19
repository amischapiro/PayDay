import React, { useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/img/PayDayLogo3.png';

import { logout } from '../store/user.action';

function _SideBar({ user, logout }) {
	return (
		<section className="side-bar">
			<div className="actions-top">
				<button className='logo-btn'>
					<img src={Logo} alt="PD" />
				</button>
				<button className='fa-solid th-large btn-fa'></button>
				<button className="fa bell  btn-fa"></button>
				<button className="fa-solid inbox  btn-fa"></button>
				<button className="fa calendar-check  btn-fa"></button>
			</div>
			<button className="see-plans btn-primary">See plans</button>			
			<div className="actions-bottom">
				<button className="fa-solid puzzle-piece btn-fa"></button>
				<button className="fa-solid user-plus btn-fa"></button>
				<button className="fa-solid search btn-fa"></button>
				<button className="fa-solid question btn-fa"></button>
				<button className='user-btn'>AS</button>
				
				{/* <button></button> setUser name letters or pic */}
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

export const SideBar = connect(mapStateToProps, mapDispatchToProps)(_SideBar);
