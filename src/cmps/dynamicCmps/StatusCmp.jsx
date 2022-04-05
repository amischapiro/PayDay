import React, {useState, useEffect} from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function StatusCmp({ story, onUpdate, boardStatuses }) {

	const [anchorEl, setAnchorEl] = useState(null);
	const [status, setStatus] = useState(story.storyData.status);
	
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = (status) => {
		setAnchorEl(null);
		setStatus(status);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (

		<div className="status-cmp">
			<Button
				aria-describedby={id}
				variant="contained"
				onClick={handleClick}
				sx={{
					background: status.color,
					':hover': { background: status.color },
				}}

				className={`status-button dog-ear`} >
				{status.title}
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
						<div className="picker-container" key={status.id}>
							<Typography
								sx={{ p: 2, background: status.color }}
								className="element-picker"
								onClick={() => {
									onUpdate('CHANGE_STATUS', status.id)
									handleClose(status)
								}
								}>
								{status.title}
							</Typography>
						</div>
					);
				})}
			</Popover>
		</div>
	);
}
