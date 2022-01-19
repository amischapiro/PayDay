import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function StatusCmp({ story, onUpdate, boardStatuses }) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const { status } = story.storyData;

	return (
		<div>
			<Button
				aria-describedby={id}
				variant="contained"
				onClick={handleClick}
				className={status.id}>
				{status.txt}
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
				{boardStatuses.map((status, idx) => {
					return (
						<Typography
							sx={{ p: 2 }}
							key={idx}
							className={status.id}
                            onClick={() =>
                                onUpdate('CHANGE_STATUS', status.id)
                            }>
							{status.txt}
						</Typography>
					);
				})}
			</Popover>
		</div>
	);
}
