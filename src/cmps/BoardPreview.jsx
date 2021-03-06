import React from 'react'
import { useState } from 'react'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TableRowsOutlinedIcon from '@mui/icons-material/TableRowsOutlined';
import { utilService } from '../services/util.service';
import { socketService } from '../services/socket.service';
import { swalService } from '../services/swal.service';
import { useDispatch } from 'react-redux';
import { removeActivities } from '../store/activity.action';
import { removeBoard, addBoard } from '../store/board.action'
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export function BoardPreview({ boards, board, currBoard }) {


    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()

    const [anchorEl, setAnchorEl] = useState(null);
    const [isHover, toggleOnHover] = useState(false)

    const handleClick = (event) => {
        event.stopPropagation()
        toggleOnHover(true)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        if (event) event.stopPropagation()
        toggleOnHover(false)
        setAnchorEl(null)
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const onRemove = async (ev, boardId) => {
        ev.stopPropagation()
        handleClose(null)
        const currBoardId = params.boardId
        if (currBoardId === '61f8f86b25bd9487389b2907') return swalService.onDeleteCoreSwal()
        await swalService.onDeleteSwal()

        if (boardId === currBoardId && boards.length > 1) goToNextBoard(currBoardId)
        await dispatch(removeBoard(boardId))
        await dispatch(removeActivities(boardId))
        socketService.emit('update workspace')
    }

    const goToNextBoard = (currBoardId) => {
        const nextBoard = boards.find(diffBoard => diffBoard._id !== currBoardId)
        dispatch({ type: 'SET_LOADING_BOARD', payload: true })
        history.push(`/board/${nextBoard?._id}/board`)
    }

    const onGoTo = () => {
        dispatch({ type: 'SET_LOADING_BOARD', payload: true })
        history.push(`/board/${board._id}/board`)
    }

    const onDuplicateBoard = async () => {
        const newBoard = { ...board }
        delete newBoard._id
        const newGroups = newBoard.groups.map(group => {
            return { ...group, id: utilService.makeId() }
        })
        newBoard.groups = newGroups
        const newStories = newGroups.map(newGroup => {
            return newGroup.stories.map(story => {
                return { ...story, id: utilService.makeId() }
            })
        })
        newBoard.groups.stories = newStories
        handleClose()
        await addBoard(newBoard)
        socketService.emit('update workspace')
    }

    return (

        <div className={currBoard?._id === board._id ?
            "board-preview curr-board" : "board-preview"}
            onClick={onGoTo}
            onMouseEnter={() => { toggleOnHover(true) }}
            onMouseOver={() => { toggleOnHover(true) }}
            onMouseLeave={() => { toggleOnHover(false) }} >
            <div>
                <TableRowsOutlinedIcon className="board-icon" />
                <span>&nbsp;{board.title}</span>


            </div>

            <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                className={isHover ? "btn-ellipsis hover" : "btn-ellipsis"}
            >
                <span className="fa-solid ellipsis-h"></span>
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
                    <span >
                        <span className="fa edit-hollow"></span>
                        <span>Rename Board</span>
                    </span>
                    <span onClick={onDuplicateBoard}>
                        <span className="fa copy"></span>
                        <span>Duplicate Board</span>
                    </span>
                    <span onClick={(ev) => { onRemove(ev, board._id) }}>
                        <span className="fa trash"></span>
                        <span>Delete</span>
                    </span>
                </Typography>

            </Popover>
        </div>


    )
}





