import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { logout, updateUser } from '../store/user.action';
import { cloudinaryService } from '../services/cloudinary.service'
import { userService } from '../services/user.service'
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
import ClickAwayListener from '@mui/material/ClickAwayListener';

export const SideBar = () => {


	const [isProfileModalOpen, toggleProfileModal] = useState(false)
	const currUser = userService.getLoggedinUser()

	const history = useHistory()
	const dispatch = useDispatch()


	const getInitials = () => {
		const fullname = currUser.fullname
		const nameArr = fullname.split(' ');
		const fName = nameArr[0].split('');
		const lName = nameArr[1].split('');
		const initials = fName[0] + lName[0];
		return initials
	}

	const onLogout = () => {
		dispatch(logout())
		onGoToHome()
	}

	const onGoToHome = () => {
		history.push('/')
	}

	const [img, setImg] = useState({
		imgUrl: null,
		height: '40px',
		width: '100%',
		isUploading: false
	})

	const uploadImg = async (ev) => {
		setImg({ ...img, isUploading: true, height: 500, width: 500 })
		const { secure_url, height, width } = await cloudinaryService.uploadImg(ev)
		setImg({ imgUrl: secure_url, isUploading: false, height, width })
		if (currUser.fullname !== 'Demo User') {
			const userToUpdate = { ...currUser, imgUrl: secure_url }
			dispatch(updateUser(userToUpdate))
			sessionStorage.setItem('loggedinUser', JSON.stringify(userToUpdate))
		}
	}

	if (!currUser) return <React.Fragment />

	return (
		<section className="side-bar">
			<div className="actions-top">
				<button className='logo-btn' onClick={onGoToHome}>
					<img src={Logo} alt="PD" />
				</button>
				<button className='workspace'>
					<GridViewOutlinedIcon className="grid-view-icon" />
				</button>
				<button>
					<NotificationsNoneOutlinedIcon className="notification-bell-icon" />
				</button>
				<button>
					<InboxOutlinedIcon className="inbox-icon" />
				</button>
				<button>
					<EventAvailableOutlinedIcon className="calendar-icon" />
				</button>
			</div>

			<button className="see-plans btn-primary">
				<AutoAwesomeIcon className="stars-icon" />
				See plans
			</button>

			<div className="actions-bottom">
				<button>
					<ExtensionOutlinedIcon className="extension-icon" />
				</button>
				<button>
					<PersonAddAlt1OutlinedIcon className="person-add-icon" />
				</button>
				<button>
					<SearchOutlinedIcon className="search-icon" />
				</button>
				<button className='logout-btn' onClick={onLogout}>
					<LogoutOutlinedIcon className="logout-icon" />
				</button>
				{currUser.imgUrl ? (
					<img src={currUser.imgUrl} alt=""
						onClick={() => toggleProfileModal(!isProfileModalOpen)} />
				) : (
					<div className="user-initials"
						onClick={() => toggleProfileModal(!isProfileModalOpen)}>
						{getInitials().toUpperCase()}

					</div>)}
			</div>
			{currUser.fullname !== 'Demo User' && isProfileModalOpen && (
				<ClickAwayListener onClickAway={() => toggleProfileModal(false)} >
					<div className="user-profile-modal">
						<span className='fa-solid times' onClick={() => toggleProfileModal(false)}></span>
						<div>Username: {currUser.fullname}</div>
						<hr />
						<span>Add a photo of you:</span>
						<div className='profile-flex-container'>
							<input type="file"
								accept='.jpg,.png,.jpeg'
								onChange={uploadImg} />
							<div className='profile-img-container'>
								{img.imgUrl ? <img src={img.imgUrl} alt="" /> : ''}
							</div>
							<button onClick={() => toggleProfileModal(false)}>Done</button>
						</div>
					</div>
				</ClickAwayListener>
			)}
		</section>
	);
}
