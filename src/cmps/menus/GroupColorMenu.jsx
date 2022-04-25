import React from 'react'
import { useState } from 'react'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { utilService } from '../../services/util.service';
import { activityService } from '../../services/activity.service';
import { useDispatch } from 'react-redux';
import { addActivity } from '../../store/activity.action';
import { boardService } from '../../services/board.service';


export function GroupColorMenu({ board, group, updateBoard, groupColor, closePrevMenu }) {

    const newBoard = { ...board };
    const { groupIdx } = boardService.getGroupAndIdx(board, group.id)

    const dispatch = useDispatch()


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
        onAddActivity('Changed color', newGroup)
        await updateBoard(newBoard)
        handleClose()
        closePrevMenu()
    }

    const onAddActivity = (type, group) => {
        const newActivity = activityService.makeNewActivity(type, board, group)
        dispatch(addActivity(newActivity))
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
                    vertical: 0,
                    horizontal: 252,
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



