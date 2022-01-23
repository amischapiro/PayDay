import React, { useState, useEffect } from 'react'

import { SideBar } from '../cmps/SideBar.jsx'
import { BoardList } from '../cmps/BoardList.jsx'
import { BoardArea } from '../cmps/BoardArea.jsx'
import { connect } from 'react-redux'

import { loadBoards, getById } from '../store/board.action'


function _BoardApp(props) {
    const [selectedBoard, setBoard] = useState(null)

    useEffect(async () => {
        const { boardId } = props.match.params
        const board = await props.getById(boardId)
        setBoard(board)
    }, [])

    // useEffect(() => {
    //     console.log(selectedBoard);
    // }, [selectedBoard])
    

    if (!selectedBoard) return <React.Fragment />

    return (
        <div className={`darken-screen ${props.isOpen?'open':''}`}>
        <main className='main-container'>
            <SideBar />
            <BoardList board={selectedBoard} />
            <BoardArea board={selectedBoard} />

        </main>
        </div>
    )
}


function mapStateToProps({ boardModule }) {
    return {
        boards: boardModule.boards,
        board: boardModule.selectedBoard,
        isOpen:boardModule.activityModalIsOpen
        // filterBy: state.boardModule.filterBy,
        // users: state.userModule.users,
        // loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    loadBoards,
    getById,
}



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)