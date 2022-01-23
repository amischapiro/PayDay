import React from 'react'
import { useState, useEffect } from 'react'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function StoryMenuBtn(props) {

    const { board, group, story, updateBoard } = props


    const newBoard = { ...board };
    const groupId = group.id;
    const groupIdx = board.groups.findIndex((group) => group.id === groupId);
    const storyId = story.id;
    const storyIdx = group.stories.findIndex((story) => story.id === storyId);

    // TODO Hover on the elliphsis
    const [isBtnsShown, toggleBtnsShown] = useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const onRemoveStory = (storyId) => {
        console.log(storyId);

        newBoard.groups[groupIdx].stories.splice(storyIdx, 1)
        updateBoard(newBoard)
    }

    return (
        <div className="">

            <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                className="btn-toggle-menu"
            >
                <span className="fa-solid caret-down"></span>
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
                    <span>
                        <span className="fa copy"></span>
                        <span>Duplicate</span>
                    </span>
                    <span onClick={() => { onRemoveStory(story.id) }}>
                        <span className="fa trash"></span>
                        <span>Delete</span>
                    </span>
                </Typography>

            </Popover>
        </div>

    )
}


