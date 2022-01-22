import React from 'react'
import { connect } from 'react-redux'
// import Box from '@mui/material/Box';
// import Popper from '@mui/material/Popper';
import { useState, useEffect } from 'react'

import { getById, removeBoard } from '../store/board.action'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import { PinDropSharp } from '@mui/icons-material'



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

    const onGoTo = async () => {
        const newBoard = await props.getById(board._id)
        // const { selectedBoard } = props
        console.log('selectedBoard:', newBoard);

        props.history.push(`/board/${board._id}/board`)
    }

    // const { boards } = props

    // console.log('onPreview', board);


    return (

        <div className={isBtnsShown ? 'board-preview on-hover' : 'board-preview'}
            onMouseLeave={() => { toggleBtnsShown(false) }} onMouseEnter={() => { toggleBtnsShown(true) }}
            onClick={() => onGoTo()}>

            <div>
                <span className='fa-solid window'></span>
                <span>&nbsp;{board.title}</span>


            </div>

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


