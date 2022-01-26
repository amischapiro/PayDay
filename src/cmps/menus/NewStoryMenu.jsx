

import React from 'react'
import { useState, useEffect } from 'react'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function NewStoryMenu(props) {

    const { board, updateBoard, onAddGroup, onAddStory } = props

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
        <div className="add-story-btn">

            <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                className="add-story-btn"
            >
                <span className="fa-solid chevron-down"></span>
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
                <Typography className="drop-down">

                    <span onClick={onAddStory} >
                        <span className="fa-solid plus"></span>
                        <span>New Story</span>
                    </span>
                    
                    <span onClick={onAddGroup}>
                        <span className="fa-solid th-list"></span>
                        <span>New group of stories</span>
                    </span>
                </Typography>

            </Popover>
        </div>

    )
}


