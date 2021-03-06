import { useState, useEffect } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function PriorityCmp({ story, onUpdate, boardPriorities }) {

	const [anchorEl, setAnchorEl] = useState(null);
	const [priority, setPriority] = useState(story.storyData.priority);

	useEffect(() => {
		setPriority(story.storyData.priority)
	}, [story.storyData.priority])

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div className="priority-cmp">
			<Button
				aria-describedby={id}
				variant="contained"
				onClick={handleClick}
				sx={{
					background: priority.color,
					':hover': { background: priority.color },
				}}
				className="priority-button dog-ear">
				{priority.title}
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
				{boardPriorities.map(priority => {
					return (
						<div className="picker-container" key={priority.id}>
							<Typography
								sx={{ p: 2, background: priority.color }}
								key={priority.id}
								className="element-picker"
								onClick={() => {
									onUpdate('CHANGE_PRIORITY', priority.id);
									handleClose()
									setPriority(priority)
								}
								}>
								{priority.title}
							</Typography>
						</div>
					);
				})}
			</Popover>
		</div>
	);
}
