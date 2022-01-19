import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function MembersCmp({ story, onUpdate, boardMembers }) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const { members } = story.storyData;

	return (
		<div>
			<Button
				aria-describedby={id}
				variant="contained"
				onClick={handleClick}>
				{members.length ? members.map((member) => {
					const nameArr = member.fullname.split(' ');
					const fName = nameArr[0].split('');
					const lName = nameArr[1].split('');
					return (
						<img key={member._id} src={member.imgUrl} alt={fName[0] + lName[0]} />
					);
				}) : 'NM'}
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
						<Typography sx={{ p: 2 }} key={idx}>
							<img
								onClick={() =>
									onUpdate('ADD_MEMBER', member._id)
								}
								src={member.imgUrl}
								alt={fName[0] + lName[0]}
							/>
						</Typography>
					);
				})}
			</Popover>
		</div>
	);
}