import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { loadBoards, } from '../store/board.action'

function _BoardPreview(props) {
    const { boards } = props

    useEffect(() => {
        const boardId = props.history.match.params
        console.log(boardId);
        props.loadBoards()

        // console.log(boards);
    }, [])

    return (
        <h1>BoardList</h1>
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

export const BoardPreview = connect(mapStateToProps, mapDispatchToProps)(_BoardPreview)