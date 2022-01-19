import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { BoardHeader } from '../cmps/BoardHeader'
import { BoardActions } from '../cmps/BoardActions'
import { GroupList } from '../cmps/GroupList'

import { loadBoards, } from '../store/board.action'


export function _BoardArea(props) {
    const { board } = props

    useEffect(() => {
        console.log(board);
    }, [])




    return (
        <section>
            <BoardHeader />
            <BoardActions />
            <GroupList board={board} />
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