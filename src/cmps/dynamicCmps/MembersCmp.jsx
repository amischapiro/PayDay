import React, { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

export function MembersCmp({ story, onUpdate, boardMembers }) {

	const [anchorEl, setAnchorEl] = React.useState(null);

	const { members } = story.storyData;
	const newMembers = [...boardMembers]

	members.forEach(member => {
		const selectedMemberIdx = newMembers.findIndex(diffMember => {
			return diffMember._id === member._id
		})
		if (selectedMemberIdx === -1) return
		newMembers.splice(selectedMemberIdx, 1)
	})


	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const getInitials = (member) => {
		const nameArr = member.fullname.split(' ');
		const fName = nameArr[0].split('');
		const lName = nameArr[1].split('');
		const initials = fName[0] + lName[0];
		return initials
	}


	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;



	return (
		<div className="members-cmp">
			<Button
				aria-describedby={id}
				variant="contained"
				onClick={handleClick}
				className="members-button">
				{!members.length ? (
					<AccountCircleOutlinedIcon className="no-members" />
				) : members.length > 2 ? (
					<div className="active-member-list">
						{members[0].imgUrl ? <img
							key={members[0]._id}
							src={members[0].imgUrl}
							alt=""
						/> : <span className="members-cmp-initials">
							{members[0].fullname.split(' ')[0].split('')[0] +
								members[0].fullname.split(' ')[1].split('')[0]}
						</span>}{' '}
						<span className="plus-members">
							+{members.length - 1}
						</span>{' '}
					</div>
				) : (
					<AvatarGroup max={2}>
						{members.map((member) => {
							const initials = getInitials(member)
							return member.imgUrl ? (
								<Avatar
									key={member._id}
									alt={initials}
									src={member.imgUrl}
									style={{ width: '30px', height: '30px' }}
								/>
							) : (
								<span
									className="members-cmp-initials"
									key={member._id}>
									{initials}
								</span>
							);
						})}
					</AvatarGroup>
				)}
			</Button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}>
				<Typography className="member-picker-container">
					<span className="selected-members">
						{members.map(member => {
							return (
								<span className="selected-member-container">
									<span className="member-details" key={member._id} >
										<span className="member-img" key={member._id}>
											{member.imgUrl ? (
												<img src={member.imgUrl} alt="" />
											) : (
												getInitials(member)
											)}
										</span>
										<span>{member.fullname}</span>
									</span>
									<span className="btn-remove" onClick={() => {
										onUpdate('ADD_MEMBER', member._id);
									}}>Unselect</span>
								</span>
							)
						})}
					</span>
					<span className="optional-members-container">
						{newMembers.map(member => {
							return (
								<span className='optional-member'>
									<span className="member-details" key={member._id} onClick={() => {
										onUpdate('ADD_MEMBER', member._id);
									}}>
										<span className="member-img" key={member._id}>
											{member.imgUrl ? (
												<img src={member.imgUrl} alt="" />
											) : (
												getInitials(member)
											)}
										</span>
										<span>{member.fullname}</span>
									</span>
								</span>
							);
						})}
					</span>
				</Typography>
			</Popover>
		</div >
	);
}
