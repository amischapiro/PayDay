import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function PriorityCmp({ story, onUpdate, boardPriorities }) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const { priority } = story.storyData;

	return (
		<div>
			<Button
				aria-describedby={id}
				variant="contained"
				onClick={handleClick}
				className={priority}>
				{priority}
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
				{boardPriorities.map((priority, idx) => {
					return (
						<Typography
							sx={{ p: 2 }}
							key={priority.id}
							className={priority.id}
                            onClick={() =>
                                onUpdate('CHANGE_PRIORITY', priority.id)
                            }>
							{priority.txt}
						</Typography>
					);
				})}
			</Popover>
		</div>
	);
}
