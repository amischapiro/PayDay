import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function PriorityCmp({ info, onUpdate, boardPriorities }) {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const { priority } = info;

	return (
		<div>
			<Button
				aria-describedby={id}
				variant="contained"
				onClick={handleClick}
				className={priority.id}>
				{priority.txt}
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
							key={idx}
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
