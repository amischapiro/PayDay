

import React from 'react'
import { useState, useEffect } from 'react'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function AddStoryBtn(props) {

    const { board, updateBoard } = props

    // const newBoard = { ...board };
    // const groupId = group.id;
    // const groupIdx = board.groups.findIndex((group) => group.id === groupId);
    // const storyId = story.id;
    // const storyIdx = group.stories.findIndex((story) => story.id === storyId);


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
                className="add-story-menu"
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
                <Typography className="drop-down add-story-menu">

                    <span>
                        <span className="fa-solid plus"></span>
                        <span>New Story</span>
                    </span>
                    <span>
                        <span className="fa-solid th-list"></span>
                        <span>New group of stories</span>
                    </span>
                </Typography>

            </Popover>
        </div>

    )
}


