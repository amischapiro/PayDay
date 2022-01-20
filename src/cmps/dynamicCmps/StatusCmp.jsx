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
	// console.log('StatusCmp.jsx 💤 21: ', status);

	return (
		<div>
			<Button
				aria-describedby={id}
				variant="contained"
				onClick={handleClick}
				sx={{
					background: status.color,
					borderRadius: 0,
					fontSize: '0.8125rem',
					boxShadow: "none",
					fontWeight: 400,
					width: "117px",
					":hover": {boxShadow: 'none', background: status.color, opacity: 0.8}
				}}>
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
						<div className="status-options" key={status.id}>
							<Typography
								sx={{
									p: 2,
									background: status.color,
									color: '#fff',
									':hover': { opacity: 0.8 },
									width: '7rem',
									height: '2rem',
									padding: 0,
									fontSize: '0.8125rem',
									textAlign: 'center',
									paddingTop: '0.4063rem',
									cursor: 'pointer',
								}}
								className={status.id}
								onClick={() =>
									onUpdate('CHANGE_STATUS', status.id)
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
