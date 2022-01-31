import React from 'react'
import { useState, useEffect } from 'react'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SyncAltRoundedIcon from '@mui/icons-material/SyncAltRounded';


export function SortMenu({ board, updateBoard }) {

    const newBoard = { ...board };

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const onSetSort = async (type) => {
        console.log(type);
        const sortBy = newBoard.sortBy;
        if (type === sortBy.name) sortBy.order *= -1;
        else {
            sortBy.name = type;
            sortBy.order = -1;
        }

        let newGroups = newBoard.groups.map((group) => {
            const newStories = group.stories.sort(function (a, b) {
                switch (sortBy.name) {
                    case 'name':
                        if (a.title.toLowerCase() < b.title.toLowerCase()) return sortBy.order;
                        else if (a.title.toLowerCase() > b.title.toLowerCase()) return sortBy.order * -1;
                        else return 0;
                    case 'status':
                        if (a.storyData.status.id < b.storyData.status.id) return sortBy.order;
                        else if (a.storyData.status.id > b.storyData.status.id) return sortBy.order * -1;
                        else return 0;
                    case 'priority':
                        if (a.storyData.priority.id < b.storyData.priority.id) return sortBy.order;
                        else if (a.storyData.priority.id > b.storyData.priority.id) return sortBy.order * -1;
                        else return 0;
                    case 'created-at':
                        if (a.createdAt < b.createdAt) return sortBy.order;
                        else if (a.createdAt > b.createdAt) return sortBy.order * -1;
                        else return 0;
                    default:
                        break;
                }
            });

            group.stories = newStories;
            return group;
        });

        newBoard.groups = newGroups;
        await updateBoard(newBoard);
    };


    return (
        <React.Fragment>
            <Button
                variant="contained"
                onClick={handleClick}
                className="sort-menu-btn"
            >
                <SyncAltRoundedIcon className="sort-icon" />
                <span>Sort</span>
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
                <Typography className="drop-down sort-drop-down">
                    <span onClick={() => onSetSort('name')}>
                        <span className="fa-solid font"></span>
                        <span>Sort by name</span>
                    </span>
                    <span onClick={() => onSetSort('status')}>
                        <span className="fa-solid traffic-light"></span>
                        <span>Sort by status</span>
                    </span>
                    <span onClick={() => onSetSort('priority')}>
                        <span className="fa-solid align-center"></span>
                        <span>Sort by priority</span>
                    </span>
                    <span onClick={() => onSetSort('created-at')}>
                        <span className="fa-solid undo"></span>
                        <span>Reset defualt</span>
                    </span>
                </Typography>

            </Popover>
        </React.Fragment>

    )
}



