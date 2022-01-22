import React from 'react'
import { connect } from 'react-redux'
// import Box from '@mui/material/Box';
// import Popper from '@mui/material/Popper';
import { useState, useEffect } from 'react'

import { removeBoard } from '../store/board.action'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'



export function __BoardPreview(props) {

    const { board, removeBoard } = props

    const [isBtnsShown, toggleBtnsShown] = useState(false)

    // console.log(props);
   
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


const _BoardPreview = withRouter(__BoardPreview)


export const BoardPreview = connect(mapStateToProps, mapDispatchToProps)(_BoardPreview)


