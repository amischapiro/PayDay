import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { BoardHeader } from '../cmps/BoardHeader'
import { BoardActions } from '../cmps/BoardActions'
import { GroupList } from '../cmps/GroupList'
import { Kanban } from './Kanban'
import { Dashboard } from './Dashboard'
import { Switch, Route } from 'react-router';


import { loadBoards, getById } from '../store/board.action'
import { BoardNav } from './BoardNav'
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min'
import { boardService } from '../services/board.service'


export function __BoardArea(props) {
    const { board } = props

    useEffect(() => {
        console.log('BoardArea.jsx 💤 22: ', board);
    }, [board])


    return (
        <section className='board-area'>
            <div className='container'>
                <BoardHeader  />
                <BoardNav board={board} />
                <BoardActions board={board} />
                <Switch className="board-switch-container">
                    <Route path="/board/:boardId/kanban" >
                        <Kanban />
                    </Route>
                    <Route path="/board/:boardId/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/board/:boardId/board">
                        <GroupList board={board} />
                    </Route>

                </Switch>


            </div>
        </section>
    )
}



function mapStateToProps({ boardModule }) {
    return {
        boards: boardModule.boards,
        board: boardModule.selectedBoard
    }
}

const mapDispatchToProps = {
    loadBoards,
    getById
}

const _BoardArea = withRouter(__BoardArea)

export const BoardArea = connect(mapStateToProps, mapDispatchToProps)(_BoardArea)