import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { updateBoard, getById } from '../store/board.action'

function _BoardHeader({ board, updateBoard }) {
    // const { title, desc } = board

    
    const [selectedBoard, setSelectedBoard] = useState(board)
    const { title, desc } = selectedBoard

    
    const [isTitleEditOn, toggleTitleEdit] = useState(false)
    const [isDescEditOn, toggleDescEdit] = useState(false)
    const [editBoard, setEditBoard] = useState({ title, desc })

    const titleRef = React.createRef()
    const decsRef = React.createRef()

    const onToggleTitleEdit = () => {
        isTitleEditOn ? toggleTitleEdit(false) : toggleTitleEdit(true)
    }

    const onToggleDescEdit = () => {
        isDescEditOn ? toggleDescEdit(false) : toggleDescEdit(true)
    }


    useEffect(() => {
        if (isTitleEditOn) titleRef.current.focus()
        if (isDescEditOn) decsRef.current.focus()

    }, [isTitleEditOn, isDescEditOn])

    const handleChange = ({ target }) => {
        const { name, value } = target
        setEditBoard({ ...editBoard, [name]: value })

    }

    const onSubmitTitle = async (ev) => {
        ev.preventDefault()
        onToggleTitleEdit()
        const BoardToUpdate = { ...board, title: editBoard.title }
        const updatedBoard = await updateBoard(BoardToUpdate)
        setSelectedBoard(updatedBoard)
    }

    const onSubmitDesc = (ev) => {
        ev.preventDefault()
        onToggleDescEdit()
        const BoardToUpdate = { ...board, desc: editBoard.desc }
        console.log(BoardToUpdate);
    }

    useEffect(() => {
        console.log(selectedBoard);
    }, [selectedBoard])



    return (
        <div>
            {!isTitleEditOn && <h3 onClick={onToggleTitleEdit}>{title}</h3>}
            {isTitleEditOn &&
                <form onSubmit={onSubmitTitle}>
                    <input ref={titleRef} type="text" onBlur={onSubmitTitle}
                        value={editBoard.title} name="title" onChange={handleChange} />
                </form>}

            {!isDescEditOn && <h5 onClick={onToggleDescEdit}>{desc ? desc : 'Enter description here'}</h5>}
            {isDescEditOn &&
                <form onSubmit={onSubmitDesc}>
                    <input ref={decsRef} type="text" onBlur={onSubmitDesc}
                        value={editBoard.desc} name="desc" onChange={handleChange} />
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
    updateBoard,
    getById
}


export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)