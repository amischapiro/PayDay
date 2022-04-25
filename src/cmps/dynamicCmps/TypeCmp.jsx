import { useState, useEffect } from 'react'
import Popover from '@mui/material/Popover'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

export function TypesCmp({ story, onUpdate, boardTypes }) {

	const [anchorEl, setAnchorEl] = useState(null)
	const [type, setType] = useState(story.storyData.type)

	useEffect(() => {
		setType(story.storyData.type)
	}, [story.storyData.type])

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const open = Boolean(anchorEl)
	const id = open ? 'simple-popover' : undefined

	return (

		<div className="type-cmp">
			<Button
				aria-describedby={id}
				variant="contained"
				onClick={handleClick}
				sx={{
					background: type.color,
					':hover': { background: type.color },
				}}

				className={`type-button dog-ear`} >
				{type.title}
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
				{boardTypes.map((type, idx) => {
					return (
						<div className="picker-container" key={type.id}>
							<Typography
								sx={{ p: 2, background: type.color }}
								className="element-picker"
								onClick={() => {
									handleClose()
									setType(type)
									onUpdate('CHANGE_TYPE', type.id)
								}
								}>
								{type.title}
							</Typography>
						</div>
					)
				})}
			</Popover>
		</div>
	)
}
