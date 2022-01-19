import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { loadBoards,  } from '../store/board.action'

function _BoardList(props) {
    const { boards } = props

    useEffect(() => {
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

export const BoardList = connect(mapStateToProps, mapDispatchToProps)(_BoardList)