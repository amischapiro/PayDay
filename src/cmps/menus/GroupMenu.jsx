import React from 'react'
import { useState, useEffect } from 'react'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { utilService } from '../../services/util.service';

export function GroupMenu({ board, group, updateBoard, groupColor }) {
    
    const newBoard = { ...board };
    const groupId = group.id;
    const groupIdx = board.groups.findIndex((group) => group.id === groupId);
    // const storyId = story.id;
    // const storyIdx = group.stories.findIndex((story) => story.id === storyId);

    const [isOnHover, toggleHover] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const onAddGroup = async () => {
        const newGroup = utilService.createEmptyGroup();

        if (
            !newBoard.groups ||
            !newBoard.groups.length
        )
            newBoard.groups = [newGroup];
        else
            newBoard.groups.unshift(newGroup)

        await updateBoard(newBoard);
        handleClose()
    }

    const onRemoveGroup = async () => {
        newBoard.groups.splice(groupIdx, 1)

        await updateBoard(newBoard);
    }

    const onDuplicateGroup = async () => {
        const newGroup = { ...group, id: utilService.makeId() }
        console.log(newGroup);
        newBoard.groups.unshift(newGroup)
        await updateBoard(newBoard)
        handleClose()
    }

    return (
        <div>

            <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                className="group-menu-btn"
                onMouseEnter={() => { toggleHover(true) }}
                onMouseLeave={() => { toggleHover(false) }}
            >
                {isOnHover ? (
                    <span style={{ backgroundColor: 'white', color: groupColor, borderColor: groupColor }}
                        className="fa-solid caret-down"></span>
                ) : (
                    <span style={{ backgroundColor: groupColor, color: 'white', borderColor: groupColor }}
                        className="fa-solid caret-down"></span>
                )}

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
                <Typography className="drop-down group-drop-down-menu">
                    <span onClick={onAddGroup}>
                        <span className="fa-solid plus"></span>
                        <span>Add group</span>
                    </span>
                    <span>
                        <span className="fa edit-hollow"></span>
                        <span>Rename group</span>
                    </span>
                    <span onClick={onDuplicateGroup}>
                        <span className="fa copy"></span>
                        <span>Duplicate</span>
                    </span>
                    <span>
                        <span className="group-color-indicator"
                            style={{ backgroundColor: groupColor }} ></span>
                        <span>Change group color</span>
                    </span>
                    <span onClick={onRemoveGroup}>
                        <span className="fa trash"></span>
                        <span>Delete</span>
                    </span>
                </Typography>

            </Popover>
        </div>

    )
}

