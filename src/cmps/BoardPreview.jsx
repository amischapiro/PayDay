import React from 'react'
import { connect } from 'react-redux'
import { useState, useEffect } from 'react'
// import Box from '@mui/material/Box';
// import Popper from '@mui/material/Popper';

import { getById, removeBoard } from '../store/board.action'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import { PinDropSharp } from '@mui/icons-material'

// import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export function __BoardPreview(props) {

    const { board, removeBoard } = props

    const [isBtnsShown, toggleBtnsShown] = useState(false)
    // const [isMenuOpen, toggleMenu] = useState(false)

    const [anchorEl, setAnchorEl] = React.useState(null);
    // console.log(props);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;



    const onRemove = (boardId) => {
        removeBoard(boardId)
    }

    const onGoTo = async () => {

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
                // sx={{padding: .1}}
            // className="priority-button dog-ear"
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
                <Typography
                    className="drop-down"
                // onClick={() =>
                // 	onUpdate('CHANGE_PRIORITY', priority.id)
                >
                    {/* {priority.title} */}
                    <span >
                        <span className="fa edit-hollow"></span>
                        <span>Rename Board</span>
                    </span>
                    <span>
                        <span className="fa copy"></span>
                        <span>Duplicate Board</span>
                    </span>
                    <span onClick={() => { onRemove(board._id) }}>
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
        selectedBoard: boardModule.selectedBoard
    }
}

const mapDispatchToProps = {
    getById,
    removeBoard
}

const _BoardPreview = withRouter(__BoardPreview)




export const BoardPreview = connect(mapStateToProps, mapDispatchToProps)(_BoardPreview)


// MuiButton-root MuiButton-contained MuiButton-containedPrimary MuiButton-sizeMedium MuiButton-containedSizeMedium MuiButtonBase-root  css-sghohy-MuiButtonBase-root-MuiButton-root