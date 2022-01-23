import React, { useState, useEffect } from 'react'

import { SideBar } from '../cmps/SideBar.jsx'
import { BoardList } from '../cmps/BoardList.jsx'
import { BoardArea } from '../cmps/BoardArea.jsx'
import { connect } from 'react-redux'
import { loadBoards, getById, removeBoard, updateBoard } from '../store/board.action'


function _BoardApp({ match, loadBoards, getById, boards, selectedBoard, updateBoard, removeBoard }) {


    useEffect(async () => {
        await loadBoards()
        const { boardId } = match.params
        await getById(boardId)
    }, [])

    useEffect(async () => {
        const { boardId } = match.params
        await getById(boardId)
    }, [match.params])



    if (!selectedBoard) return <React.Fragment />

    return (
        <main className='main-container'>
            <SideBar />
            <BoardList boards={boards} removeBoard={removeBoard} />
            <BoardArea boards={boards} board={selectedBoard} updateBoard={updateBoard} />
        </main>
    )
}


function mapStateToProps({ boardModule }) {
    return {
        boards: boardModule.boards,
        selectedBoard: boardModule.selectedBoard,
        // filterBy: state.boardModule.filterBy,
        // users: state.userModule.users,
        // loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    loadBoards,
    getById,
    removeBoard,
    updateBoard
}



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)