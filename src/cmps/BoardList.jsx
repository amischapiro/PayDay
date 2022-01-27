import { connect } from 'react-redux'
import React from 'react'
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { useState, useEffect } from 'react'

import { BoardPreview } from './BoardPreview';
import { utilService } from '../services/util.service'


function _BoardList({ boards, updateBoard, removeBoard, addBoard, currBoard }) {



    const [anchorEl, setAnchorEl] = useState(null);
    const [isBoardListOpen, toggleBoardList] = useState(true)


    const onToggleBoardListShown = () => {
        isBoardListOpen ? toggleBoardList(false) : toggleBoardList(true)
    }

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popper' : undefined;

    const onAddBoard = async () => {
        const newBoard = utilService.createEmptyBoard()
        await addBoard(newBoard)
    }



    return (
        <section className={`boardlist-container ${isBoardListOpen ? 'open' : ''}`} >
            <span className="workspace-title" >Workspace</span>
            <button className={`toggle-btn fa-solid ${isBoardListOpen ? 'angleleft' : 'angleright'} `} onClick={() => onToggleBoardListShown()} ></button>
            <button className='workspace-toggle' aria-describedby={id} type="button" onClick={handleClick}>
                <h2>Main workspace <span className={`fa-solid ${open ? 'angleup' : 'angledown'} `} ></span> </h2>
            </button>
            {/* <Popper id={id} open={open} anchorEl={anchorEl}>
                <Box sx={{ border: 0, borderRadius: 2, p: 5, bgcolor: 'white' }}>
                    <h3>My workspaces</h3>
                    <h5>Main workspace</h5>
                </Box>
            </Popper> */}
            <div onClick={onAddBoard} className='add-board' >
                <span className='fa-solid plus'></span>
                <span> Add</span>
            </div>
            <div className='filter-boards' >
                <span className='fa-solid filter'></span>
                <span> Filter</span>

            </div>

            <div className='break-line' ></div>

            <div className='boards-container'>
                {boards.map(board => {
                    return < BoardPreview key={board._id} board={board} currBoard={currBoard} boards={boards}
                        updateBoard={updateBoard} removeBoard={removeBoard} addBoard={addBoard} />
                })}
            </div>


        </section>

    )

}





function mapStateToProps({ boardModule }) {
    return {
        // boards: boardModule.boards
    }
}

const mapDispatchToProps = {
    // loadBoards
}

export const BoardList = connect(mapStateToProps, mapDispatchToProps)(_BoardList)