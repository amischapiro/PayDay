import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { updateBoard } from '../store/board.action'

function _BoardHeader({ board, updateBoard }) {
    const { title, desc } = board

    const [isTitleEditOn, toggleTitleEdit] = useState(false)
    const [isDescEditOn, toggleDescEdit] = useState(false)
    const [editBoard, setEditBoard] = useState({ title, desc })


    const onToggleTitleEdit = () => {
        isTitleEditOn ? toggleTitleEdit(false) : toggleTitleEdit(true)
    }

    const onToggleDescEdit = () => {
        isDescEditOn ? toggleDescEdit(false) : toggleDescEdit(true)
    }


    useEffect(() => {

    }, [])

    const handleChange = ({ target }) => {
        const { name, value } = target
        setEditBoard({ ...editBoard, [name]: value })

    }

    const onSubmitTitle = (ev) => {
        ev.preventDefault()
        onToggleTitleEdit()
        const BoardToUpdate = { ...board, title: editBoard.title }
        updateBoard(BoardToUpdate)
    }

    const onSubmitDesc = (ev) => {
        ev.preventDefault()
        onToggleDescEdit()
        const BoardToUpdate = { ...board, desc: editBoard.desc }
        console.log(BoardToUpdate);
    }



    return (
        <div>
            {!isTitleEditOn && <h3 onClick={onToggleTitleEdit}>{title}</h3>}
            {isTitleEditOn &&
                <form onSubmit={onSubmitTitle}>
                    <input type="text" value={editBoard.title} name="title" onChange={handleChange} />
                    <button>Save</button>
                </form>}
            {!isDescEditOn && <h5 onClick={onToggleDescEdit}>{desc ? desc : 'Enter description here'}</h5>}
            {isDescEditOn &&
                <form onSubmit={onSubmitDesc}>
                    <input type="text" value={editBoard.desc} name="desc" onChange={handleChange} />
                    <button>Save</button>
                </form>}
        </div>
    )
}

function mapStateToProps({ boardModule }) {
    return {
        // board: boardModule.board,
        // users: state.userModule.users,
        // loggedInUser: state.userModule.loggedInUser
    }
}

const mapDispatchToProps = {
    updateBoard
}


export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)