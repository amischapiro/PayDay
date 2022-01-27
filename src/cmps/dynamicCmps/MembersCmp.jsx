import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

export function MembersCmp({ story, onUpdate, boardMembers }) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	console.log('boardMembers:', boardMembers);
	

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const { members } = story.storyData;

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
					<div className="active-member-list"><img
						key={members[0]._id}
						src={members[0].imgUrl}
						alt=""
					/> <span className="plus-members">+{members.length - 1}</span> </div>
				) : (
					<AvatarGroup max={2}>
						{members.map(member => {
							const nameArr = member.fullname.split(' ');
							const fName = nameArr[0].split('');
							const lName = nameArr[1].split('');
							const initials = fName[0] + lName[0];

							return (member.imgUrl? <Avatar key={member._id} alt={initials} src={member.imgUrl}
								style={{ width: '30px', height: '30px' }} /> : <div className='members-cmp-initials' key={member._id} >{initials}</div> )
						})

						}
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
				{boardMembers.map((member, idx) => {
					const nameArr = member.fullname.split(' ');
					const fName = nameArr[0].split('');
					const lName = nameArr[1].split('');
					return (
						<div className="picker-container" key={member._id}>
							<Typography
								sx={{ p: 2 }}
								className="member-picker"
								onClick={() => {
									onUpdate('ADD_MEMBER', member._id)
									handleClose()
								}
								}>
								<img
									src={member.imgUrl}
									alt={fName[0] + lName[0]}
								/>{' '}
								{member.fullname}
							</Typography>
						</div>
					);
				})}
			</Popover>
		</div>
	);
}
