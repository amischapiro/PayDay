import React, { useState, useEffect } from 'react'
import { Switch, Route } from 'react-router';

import { BoardNav } from './BoardNav'
import { BoardHeader } from '../cmps/BoardHeader'
import { BoardActions } from '../cmps/BoardActions'
import { GroupList } from '../cmps/GroupList'
import { Kanban } from './Kanban'
import { Dashboard } from './Dashboard'




export function BoardArea({ board, updateBoard }) {



    return (
        <section className='board-area'>
            <div className='container'>
                <BoardHeader board={board} updateBoard={updateBoard} />
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
                        <GroupList board={board} updateBoard={updateBoard} />
                    </Route>

                </Switch>


            </div>
        </section>
    )
}



