import React from 'react'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'

import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'

import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function __BoardPreview(props) {

    const { boards, board, removeBoard, updateBoard } = props

    // TODO Hover on the elliphsis
    const [isBtnsShown, toggleBtnsShown] = useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        event.stopPropagation()
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        event.stopPropagation()
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const onRemove = async (ev, boardId) => {
        ev.stopPropagation()
        const currBoardId = props.match.params.boardId
        if (boardId === currBoardId) goToNextBoard(currBoardId)
        await removeBoard(boardId)
    }

    const goToNextBoard = (currBoardId) => {
        const nextBoard = boards.find(diffBoard => diffBoard._id !== currBoardId)
        props.history.push(`/board/${nextBoard?._id}/board`)
    }

    const onGoTo = () => {
        props.history.push(`/board/${board._id}/board`)
    }



    return (

        <div className={isBtnsShown ? 'board-preview on-hover' : 'board-preview'}
            onMouseLeave={() => { toggleBtnsShown(false) }} onMouseEnter={() => { toggleBtnsShown(true) }}
            onClick={onGoTo}>
            <div>
                <span className='fa-solid window'></span>
                <span>&nbsp;{board.title}</span>


            </div>

            <Button
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                className="btn-ellipsis"
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
                    <span>
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



function mapStateToProps({ boardModule }) {
    return {
    }
}

const mapDispatchToProps = {

}

const _BoardPreview = withRouter(__BoardPreview)




export const BoardPreview = connect(mapStateToProps, mapDispatchToProps)(_BoardPreview)

