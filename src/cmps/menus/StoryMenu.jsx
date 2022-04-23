import React from 'react'
import { useState } from 'react'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { utilService } from '../../services/util.service';
import { boardService } from '../../services/board.service'
import { activityService } from '../../services/activity.service'

import { useDispatch } from 'react-redux'
import { addActivity } from '../../store/activity.action'

export function StoryMenu({ board, group, story, updateBoard }) {

    const dispatch = useDispatch()

    const newBoard = { ...board };
    const { groupIdx } = boardService.getGroupAndIdx(board, group.id)
    const { storyIdx } = boardService.getGroupAndIdx(board, group.id, story.id)

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


    const onRemoveStory = async () => {
        handleClose()
        newBoard.groups[groupIdx].stories.splice(storyIdx, 1)
        onAddActivity('Story deleted')
        await updateBoard(newBoard)
    }

    const onDuplicateStory = async () => {
        handleClose()
        const newStory = JSON.parse(JSON.stringify(story))
        newStory.id = utilService.makeId();
        newBoard.groups[groupIdx].stories.unshift(newStory)
        onAddActivity('Story duplicated')
        await updateBoard(newBoard)
    }


    const onAddActivity = (type) => {
        const newActivity = activityService.makeNewActivity(type, board, group, story)
        dispatch(addActivity(newActivity))
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


