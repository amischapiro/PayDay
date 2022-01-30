import React, { useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { logout } from '../store/user.action';
import Logo from '../assets/img/PayDayLogo3.png';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import InboxOutlinedIcon from '@mui/icons-material/InboxOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import ExtensionOutlinedIcon from '@mui/icons-material/ExtensionOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

function __SideBar(props) {

	const getInitials = ()=>{
		const fullname = JSON.parse(sessionStorage.loggedinUser).fullname
		const nameArr = fullname.split(' ');
        const fName = nameArr[0].split('');
        const lName = nameArr[1].split('');
        const initials = fName[0] + lName[0];
        return initials
	}
	
	const onLogout =()=>{
		props.logout()
		onGoToHome()
	}
	
	 
	

	const onGoToHome = () => {
		props.history.push('/')
	}

	return (
		<section className="side-bar">
			<div className="actions-top">
				<button className='logo-btn' onClick={onGoToHome}>
					<img src={Logo} alt="PD" />
				</button>
				<button className='workspace'><GridViewOutlinedIcon className="grid-view-icon" /></button>
				<button><NotificationsNoneOutlinedIcon className="notification-bell-icon" /></button>
				<button><InboxOutlinedIcon className="inbox-icon" /></button>
				<button><EventAvailableOutlinedIcon className="calendar-icon" /></button>	
			</div>
			<button className="see-plans btn-primary"><AutoAwesomeIcon className="stars-icon" /> See plans</button>
			<div className="actions-bottom">
				<button><ExtensionOutlinedIcon className="extension-icon" /></button>
				<button><PersonAddAlt1OutlinedIcon className="person-add-icon" /></button>
				<button><SearchOutlinedIcon className="search-icon" /></button>
				<button className='logout-btn' onClick={onLogout}><LogoutOutlinedIcon className="logout-icon" /></button>
				<div className='user-btn-container'><button className='user-btn'>{getInitials()}</button></div>

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

const _SideBar = withRouter(__SideBar)

export const SideBar = connect(mapStateToProps, mapDispatchToProps)(_SideBar);
