import React, { useState, useEffect } from 'react'

import { SideBar } from '../cmps/SideBar.jsx'
import { BoardList } from '../cmps/BoardList.jsx'
import { BoardArea } from '../cmps/BoardArea.jsx'
import { connect } from 'react-redux'
import { setStory } from '../store/board.action'

// import { withRouter } from 'react-router-dom'
import { loadBoards, getById } from '../store/board.action'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'


function _BoardApp(props) {

    useEffect(async () => {
        await loadBoards()
        const { boardId } = props.match.params
        // console.log(boardId);
        const board = await props.getById(boardId)
        // console.log(board);
    }, [])

    useEffect(() => {
        // console.log(props.selectedBoard);
    }, [props.selectedBoard])

    useEffect(async () => {
        const { boardId } = props.match.params
        const board = await props.getById(boardId)
        // console.log('BoardApp.jsx 💤 29: ', board);
        // console.log('BoardApp.jsx 💤 30: ', props.selectedBoard);
        // setBoard(board)
    }, [props.match.params])

    const onRemoveStory = async () =>{
        const story ={
            boardId:null,
            groupId:null,
            storyId:null
        }
        await props.setStory(story)

    }

    if (!props.selectedBoard) return <React.Fragment />

    return (
        <main className='main-container'>
            <SideBar />
            <BoardList board={props.selectedBoard} />
            {/* <BoardArea /> */}
            <BoardArea board={props.selectedBoard} />

            <div onClick={() => onRemoveStory()} className={`darken-screen ${props.selectedStoryIds.storyId ? 'open' : ''}`}>
            </div>
        </main>
    )
}


function mapStateToProps({ boardModule }) {
    return {
        boards: boardModule.boards,
        board: boardModule.selectedBoard,
        selectedStoryIds: boardModule.activityModalStory,
        selectedBoard: boardModule.selectedBoard,
        // filterBy: state.boardModule.filterBy,
        // users: state.userModule.users,
        // loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    loadBoards,
    getById,
    setStory
}

// const _BoardApp = withRouter(__BoardApp)

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)