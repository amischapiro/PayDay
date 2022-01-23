import React, { useState, useRef } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function LinkCmp({ story, onUpdate }) {
	const { link } = story.storyData;

	const [anchorEl, setAnchorEl] = React.useState(null);

	const [name, setName] = useState(link.name || link.url || '');
	const [url, setUrl] = useState(link.url || '');
	const inputEl = useRef();

	const onAddLink = async ({ target }) => {
		const value = target.value;
        // console.log('LinkCmp.jsx 💤 17: ', value);
		if (!value.name && !value.url) return;

		await onUpdate('CHANGE_LINK', value);
		setName(value.name || '');
		setUrl(value.url || '');
	};

	const handleUpdate = (ev) => {
		if (ev.key === 'Enter' || ev.type === 'blur') {
			onAddLink(ev);
		}
	};

	const handleChange = ({ target }) => {
		const { value } = target;
        if(target.name === 'name') setName(value);
        else setUrl(value);
	};

	const onFocusInput = () => {
		inputEl.current.focus();
	};

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	return (
		<div className="link-container">
			<Button
				aria-describedby={id}
				variant="contained"
				onClick={handleClick}
				className="link-button">
				<a href={link.url || '#'}>{name}</a>
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
				<div className="link-popover">
					<form onSubmit={(ev) => handleUpdate(ev)} onBlur={(ev) => handleUpdate(ev)}>
						<Typography className="link-editor">
							<input
								autoComplete="off"
								name="url"
								type="text"
								placeholder="www.example.com"
								onBlur={handleUpdate}
								onKeyUp={handleUpdate}
								value={url}
								onChange={handleChange}
								ref={inputEl}
                                onSubmit={(ev) => handleUpdate(ev)}
							/>
						</Typography>
						<Typography className="link-editor">
							<input
								autoComplete="off"
								name="name"
								type="text"
								placeholder="Text to display"
								onBlur={handleUpdate}
								onKeyUp={handleUpdate}
								value={name}
								onChange={handleChange}
								ref={inputEl}
                                onSubmit={(ev) => handleUpdate(ev)}
							/>
						</Typography>
					</form>
				</div>
			</Popover>
		</div>
	);
}
