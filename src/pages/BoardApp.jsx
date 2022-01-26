import React, { useState, useEffect } from 'react'

import { Switch, Route } from 'react-router';

import { BoardNav } from '../cmps/BoardNav'
import { BoardHeader } from '../cmps/BoardHeader'
import { BoardActions } from '../cmps/BoardActions'
import { GroupList } from '../cmps/GroupList'
import { Kanban } from '../cmps/kanban/Kanban'
import { Dashboard } from '../cmps/Dashboard'

import { ActivityModal } from '../cmps/ActivityModal'


import { SideBar } from '../cmps/SideBar.jsx'
import { BoardList } from '../cmps/BoardList.jsx'
import { connect } from 'react-redux'
import { loadBoards, getById, removeBoard, updateBoard, addBoard, setStory } from '../store/board.action'


function _BoardApp({ match, loadBoards, getById, boards, selectedBoard, updateBoard, removeBoard, addBoard, setStory, selectedStoryIds }) {

    useEffect(async () => {
        await loadBoards()
        const { boardId } = match.params
        await getById(boardId)
    }, [])

    useEffect(async () => {
        const { boardId } = match.params
        await getById(boardId)
    }, [match.params])

    const onRemoveStory = async () => {
        const story = {
            boardId: null,
            groupId: null,
            storyId: null
        }
        await setStory(story)
    }

    if (!selectedBoard) return <React.Fragment />

    return (
        <main className='main-container'>
            <SideBar />
            <BoardList boards={boards} currBoard={selectedBoard}
                removeBoard={removeBoard} addBoard={addBoard} />

            <section className="main-content">
                <section className="main-header">
                    <BoardHeader board={selectedBoard} updateBoard={updateBoard} />
                    <BoardNav board={selectedBoard} />
                    <BoardActions board={selectedBoard} updateBoard={updateBoard} />
                </section>
                {/* {selectedBoard ? (
                <BoardArea boards={boards} board={selectedBoard} updateBoard={updateBoard} />
                ) : <div>No Boards</div>
            } */}
                <div className="board-content">

                    <Switch className="board-switch-container">
                        <Route path="/board/:boardId/kanban" >
                            <Kanban />
                        </Route>
                        <Route path="/board/:boardId/dashboard">
                            <Dashboard />
                        </Route>
                        <Route path="/board/:boardId/board">
                            <GroupList board={selectedBoard} updateBoard={updateBoard} />
                        </Route>

                    </Switch>
                    <ActivityModal updateBoard={updateBoard} />


                </div>
            </section>

            <div onClick={() => onRemoveStory()} className={`darken-screen ${selectedStoryIds.storyId ? 'open' : ''}`}>
            </div>
        </main>
    )
}


function mapStateToProps({ boardModule }) {
    return {
        boards: boardModule.boards,
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
    removeBoard,
    updateBoard,
    addBoard,
    setStory
}



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)