import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { BoardHeader } from '../cmps/BoardHeader'
import { BoardActions } from '../cmps/BoardActions'
import { GroupList } from '../cmps/GroupList'
import { Kanban } from './Kanban'
import {Dashboard} from './Dashboard'
import { Switch, Route } from 'react-router';


import { loadBoards, } from '../store/board.action'
import { BoardNav } from './BoardNav'


export function _BoardArea(props) {
    const { board } = props

    // console.log(props.match.params);
    
    useEffect(() => {
        // console.log(board);
    }, [])

    return (
        <section className='board-area'>
            <div className='container'>
                <BoardHeader board={board} />
                <BoardNav board={board} />
                <BoardActions board={board} />
                <Switch className="board-switch-container">
                    <Route path="/board/:boardId?/kanban" >
                        <Kanban/>
                    </Route>
                    <Route path="/board/:boardId?/dashboard">
                        <Dashboard/>
                    </Route>
                    <Route path="/board/:boardId?">
                        <GroupList board={board}  />
                    </Route>

                </Switch>


            </div>
        </section>
    )
}



function mapStateToProps({ boardModule }) {
    return {
        boards: boardModule.boards
    }
}

const mapDispatchToProps = {
    loadBoards
}

export const BoardArea = connect(mapStateToProps, mapDispatchToProps)(_BoardArea)