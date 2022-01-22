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
    const { selectedBoard } = props
    // const { board } = props 

    const [board, setBoard] = useState(null)
    // const { selectedBoard } = props
    useEffect(() => {
        // getBoard()
        console.log(selectedBoard);
        setBoard({ ...board, selectedBoard })
    }, [selectedBoard])

    // useEffect(() => {
    //     console.log(board);
    // }, [board])


    // const getBoard = async () => {
    //     const { boardId } = props.match.params
    //     const board = await props.getById(boardId)
    //     // setBoard({...board, selectedBoard})
    //     // console.log(selectedBoard);
    // }


    if (!selectedBoard) return <React.Fragment />

    return (
        <section className='board-area'>
            <div className='container'>
                <BoardHeader board={selectedBoard} />
                <BoardNav board={selectedBoard} />
                <BoardActions board={selectedBoard} />
                <Switch className="board-switch-container">
                    <Route path="/board/:boardId?/kanban" >
                        <Kanban />
                    </Route>
                    <Route path="/board/:boardId?/dashboard">
                        <Dashboard />
                    </Route>
                    <Route path="/board/:boardId/board">
                        <GroupList board={selectedBoard} />
                    </Route>

                </Switch>


            </div>
        </section>
    )
}



function mapStateToProps({ boardModule }) {
    return {
        boards: boardModule.boards,
        selectedBoard: boardModule.selectedBoard
    }
}

const mapDispatchToProps = {
    loadBoards,
    getById
}

const _BoardArea = withRouter(__BoardArea)

export const BoardArea = connect(mapStateToProps, mapDispatchToProps)(_BoardArea)