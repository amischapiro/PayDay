import React from 'react'
import { useState, useEffect } from 'react'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function StoryMenu(props) {

    const { board, group, story, updateBoard } = props

    const newBoard = { ...board };
    const groupId = group.id;
    const groupIdx = board.groups.findIndex((group) => group.id === groupId);
    const storyId = story.id;
    const storyIdx = group.stories.findIndex((story) => story.id === storyId);

    const [isHover, toggleIsHover] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        toggleIsHover(true)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        toggleIsHover(false)
        setAnchorEl(null);
    };


    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const onRemoveStory = (storyId) => {
        console.log(storyId);

        newBoard.groups[groupIdx].stories.splice(storyIdx, 1)
        updateBoard(newBoard)
    }
    const onDuplicateStory = () => {

    }

    return (
        <div
            onMouseEnter={() => { toggleIsHover(true) }}
            onMouseOver={() => { toggleIsHover(true) }}
            onMouseLeave={() => { toggleIsHover(false) }}
        >

            <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                className="btn-toggle-menu"

            >
                <span className={isHover ? "fa-solid caret-down hover" : "fa-solid caret-down"}></span>
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
                    <span onClick={() => { onDuplicateStory() }}>
                        <span className="fa copy"></span>
                        <span>Duplicate</span>
                    </span>
                    <span onClick={() => { onRemoveStory(story.id) }}>
                        <span className="fa trash"></span>
                        <span>Delete</span>
                    </span>
                </Typography>

            </Popover>
        </div >

    )
}


