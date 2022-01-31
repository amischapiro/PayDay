import React from 'react'
import { useState, useEffect } from 'react'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';


export function ColumnMenu({ onSetCol }) {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <React.Fragment>
            <Button
                variant="contained"
                onClick={handleClick}
                className="column-menu-btn"
            >
                <AddCircleOutlineRoundedIcon className="add-col-but" />
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
                <Typography className="drop-down column-drop-down">
                    <div onClick={() => onSetCol('status-picker')}>
                        <span className="fa-solid battery-three-quarters"></span>
                        <span>Status</span>
                    </div>
                    <div onClick={() => onSetCol('priority-picker')}>
                        <span className="fa-solid exclamation"></span>
                        <span>Priority</span>
                    </div>
                    <div onClick={() => onSetCol('member-picker')}>
                        <span className="fa-solid users"></span>
                        <span>People</span>
                    </div>
                    <div onClick={() => onSetCol('timeline-picker')}>
                        <span className="fa calendar-alt"></span>
                        <span>Timeline</span>
                    </div>
                    <div onClick={() => onSetCol('number-picker')}>
                        <span className="fa-solid calculator"></span>
                        <span>Calc.</span>
                    </div>
                    <div onClick={() => onSetCol('link-picker')}>
                        <span className="fa-solid link"></span>
                        <span>Link</span>
                    </div>
                    <div onClick={() => onSetCol('due-date-picker')}>
                        <span className="fa calendar-times"></span>
                        <span>Due Date</span>
                    </div>
                    <div onClick={() => onSetCol('type-picker')}>
                        <span className="fa-solid align-justify"></span>
                        <span>Type</span>
                    </div>
                </Typography>
            </Popover>
        </React.Fragment>

    )
}