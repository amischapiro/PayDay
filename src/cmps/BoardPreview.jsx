import React from 'react'
import { connect } from 'react-redux'
// import Box from '@mui/material/Box';
// import Popper from '@mui/material/Popper';
import { useState, useEffect } from 'react'

import { removeBoard } from '../store/board.action'



export function _BoardPreview({ board, removeBoard }) {

    const [isBtnsShown, toggleBtnsShown] = useState(false)


    const onToggleBtnsTrue = () => {
        toggleBtnsShown(true)
    }

    const onToggleBtnsfalse = () => {
        toggleBtnsShown(false)
    }

    const onRemove = (boardId) => {
        removeBoard(boardId)

    }
    // const { boards } = props

    // console.log('onPreview', board);


    return (
        <div className={isBtnsShown ? 'board-preview on-hover' : 'board-preview'}
           onMouseLeave={onToggleBtnsfalse} onMouseEnter={onToggleBtnsTrue}>
                
            <div>
                <span className='fa-solid window'></span>
                <span>&nbsp;{board.title}</span>
                <span className='btns-container'>
                    <span className='fa edit-hollow'></span>
                    <span onClick={() => onRemove(board._id)} className='fa trash'></span>
                </span>

            </div>
        </div>
    )
}



function mapStateToProps({ boardModule }) {
    return {
    }
}

const mapDispatchToProps = {
    removeBoard
}



export const BoardPreview = connect(mapStateToProps, mapDispatchToProps)(_BoardPreview)


