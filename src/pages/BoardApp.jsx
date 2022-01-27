import React, { useState, useEffect } from 'react'

import { Switch, Route } from 'react-router';

import { BoardNav } from '../cmps/BoardNav'
import { BoardHeader } from '../cmps/BoardHeader'
import { BoardActions } from '../cmps/BoardActions'
import { GroupList } from '../cmps/GroupList'
import { Kanban } from '../cmps/kanban/Kanban'
import { Dashboard } from '../cmps/Dashboard'

import { ActivityModal } from '../cmps/ActivityModal'


import { socketService } from '../services/socket.service';
import { SideBar } from '../cmps/SideBar.jsx'
import { BoardList } from '../cmps/BoardList.jsx'
import { connect } from 'react-redux'
import { loadBoards, getById, removeBoard, updateBoard, addBoard, setStory, setFilterBy } from '../store/board.action'


function _BoardApp({ match, loadBoards, getById, boards, selectedBoard, updateBoard, removeBoard, addBoard, setStory, selectedStoryIds, setFilterBy, filterBy }) {

    const { boardId } = match.params

    useEffect(async () => {
        await loadBoards()
        await getById(boardId)
        socketService.setup()

        socketService.on('board has updated', async updatedBoardId => {
            await getById(updatedBoardId)
        })
        return () => {
            socketService.terminate()
        }
    }, [])

    useEffect(async () => {
        await getById(boardId)
        socketService.emit('enter board', boardId)
    }, [match.params])

    useEffect(() => {
        selectedBoard = filterBoard(selectedBoard, filterBy)
    }, [filterBy])


    const onUpdateBoard = async (boardToUpdate) => {
        await updateBoard(boardToUpdate)
        socketService.emit('update board', boardId)
    }


    const onRemoveStory = async () => {
        const story = {
            boardId: null,
            groupId: null,
            storyId: null
        }
        await setStory(story)
    }

    const filterBoard = (board, filterBy) => {
        console.log('BoardApp.jsx 💤 65: ', filterBy);
        if(!filterBy || filterBy === {}) return board;
    
        if (filterBy?.name) board.groups.forEach((group, idx) => {
            const stories = group.stories.filter(story => {
                return story.title.toLowerCase().includes(filterBy.name)
            })
            board.groups[idx].stories = stories;
        });
    
        if (filterBy?.priority) board.groups.forEach((group, idx) => {
            const stories = group.stories.filter(story => {
                return story.storyData.priority.title === filterBy.priority;
            })
            board.groups[idx].stories = stories;
        });
    
        if (filterBy?.status) board.groups.forEach((group, idx) => {
            const stories = group.stories.filter(story => {
                return story.storyData.status.title === filterBy.status;
            })
            board.groups[idx].stories = stories;
        });
    
        if (filterBy?.members) board.groups.forEach((group, idx) => {
            const stories = group.stories.filter(story => {
                return story.storyData.status.members.some(member => {
                    return filterBy.members.some(filterMem => {
                        return filterMem.id === member._id;
                    });
                })
            })
            board.groups[idx].stories = stories;
        });
        
        return board;
    }

    if (!boards?.length) return (
        <main className="main-container">
            <SideBar />
            <BoardList boards={boards} currBoard={selectedBoard}
                removeBoard={removeBoard} addBoard={addBoard} loadBoards={loadBoards} />
            <div className="loader"></div>
        </main>
    )

    if (!selectedBoard) return <React.Fragment />

    return (
        <main className='main-container'>
            <SideBar />
            <BoardList boards={boards} currBoard={selectedBoard}
                loadBoards={loadBoards} removeBoard={removeBoard}
                addBoard={addBoard} />

            <section className="main-content">
                <section className="main-header">
                    <BoardHeader board={selectedBoard} updateBoard={onUpdateBoard} />
                    <BoardNav board={selectedBoard} />
                    <BoardActions board={selectedBoard} updateBoard={onUpdateBoard} getById={getById} setFilterBy={setFilterBy} />
                </section>
                <div className="board-content">

                    <Switch className="board-switch-container">
                        <Route path="/board/:boardId/kanban" >
                            <Kanban />
                        </Route>
                        <Route path="/board/:boardId/dashboard">
                            <Dashboard />
                        </Route>
                        <Route path="/board/:boardId/board">
                            <GroupList board={selectedBoard} updateBoard={onUpdateBoard} />
                        </Route>

                    </Switch>
                    <ActivityModal boards={boards} selectedBoard={selectedBoard} updateBoard={onUpdateBoard} />


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
        filterBy: boardModule.filterBy,
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
    setStory,
    setFilterBy
}



export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)