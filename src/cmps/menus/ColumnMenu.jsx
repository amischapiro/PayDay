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
                    <span onClick={() => onSetCol('status-picker')}>
                        <span className="fa-solid font"></span>
                        <span>Status</span>
                    </span>
                    <span onClick={() => onSetCol('priority-picker')}>
                        <span className="fa-solid traffic-light"></span>
                        <span>Priority</span>
                    </span>
                    <span onClick={() => onSetCol('member-picker')}>
                        <span className="fa-solid align-center"></span>
                        <span>People</span>
                    </span>
                    <span onClick={() => onSetCol('timeline-picker')}>
                        <span className="fa-solid undo"></span>
                        <span>Timeline</span>
                    </span>
                    <span onClick={() => onSetCol('number-picker')}>
                        <span className="fa-solid undo"></span>
                        <span>Calc.</span>
                    </span>
                    <span onClick={() => onSetCol('link-picker')}>
                        <span className="fa-solid undo"></span>
                        <span>Link</span>
                    </span>
                    <span onClick={() => onSetCol('due-date-picker')}>
                        <span className="fa-solid undo"></span>
                        <span>Due Date</span>
                    </span>
                    <span onClick={() => onSetCol('type-picker')}>
                        <span className="fa-solid undo"></span>
                        <span>Type</span>
                    </span>
                </Typography>
            </Popover>
        </React.Fragment>

    )
}