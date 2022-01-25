import React from 'react'
import { useState, useEffect } from 'react'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { utilService } from '../../services/util.service';


export function GroupColorMenu({ board, group, updateBoard, groupColor, closePrevMenu }) {

    const newBoard = { ...board };
    const groupId = group.id;
    const groupIdx = board.groups.findIndex((group) => group.id === groupId);

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const onChangeGroupColor = async (selectedColor) => {
        const newGroup = { ...group, style: { backgroundColor: selectedColor } }
        newBoard.groups.splice(groupIdx, 1, newGroup)
        await updateBoard(newBoard)
        handleClose()
        closePrevMenu()
    }

    return (
        <React.Fragment>

            <Button
                variant="contained"
                onClick={handleClick}
                className="group-color-menu-btn"
            >
                <div className="group-color-row">
                    <div className="group-color-indicator"
                        style={{ backgroundColor: groupColor }} ></div>
                    <span>Change group color</span>
                    <span className="fa-solid chevron-right"></span>
                </div>

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
                <Typography className="drop-down group-color-opts-menu">
                    {utilService.getGroupColors().map(color => {
                        return <span className="group-color-opts" key={utilService.makeId()}
                            style={{ backgroundColor: color }}
                            onClick={() => { onChangeGroupColor(color) }} ></span>
                    })}
                </Typography>

            </Popover>

        </React.Fragment>
    )
}



