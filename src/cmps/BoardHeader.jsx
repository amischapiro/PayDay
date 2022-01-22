import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { updateBoard } from '../store/board.action'

function _BoardHeader({ board, updateBoard }) {

    const [selectedBoard, setSelectedBoard] = useState(board)
    const { title, desc } = selectedBoard


    const [isTitleEditOn, toggleTitleEdit] = useState(false)
    const [isDescEditOn, toggleDescEdit] = useState(false)
    const [editBoard, setEditBoard] = useState({ title, desc: desc || '' })

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
        const boardToUpdate = { ...selectedBoard, title: editBoard.title }
        const updatedBoard = await updateBoard(boardToUpdate)
        setSelectedBoard(updatedBoard)
    }

    const onSubmitDesc = async (ev) => {
        ev.preventDefault()
        onToggleDescEdit()
        const boardToUpdate = { ...selectedBoard, desc: editBoard.desc }
        const updatedBoard = await updateBoard(boardToUpdate)
        setSelectedBoard(updatedBoard)
    }



    return (
        <div className='board-header'>

            <div className='title-and-action'>

                <div className='title-section'>
                    {!isTitleEditOn && <h3 onClick={onToggleTitleEdit}>{title ? title : 'Enter title here'}</h3>}
                    {isTitleEditOn &&
                        <form onSubmit={onSubmitTitle}>
                            <input ref={titleRef} type="text" onBlur={onSubmitTitle}
                                value={editBoard.title} name="title" onChange={handleChange} />
                        </form>}
                    <div className='fa-solid info-circle'></div>
                    <div className='fa star'></div>
                </div>

                <div className='header-actions'>
                    <div className='last-seen'>
                        Last seen
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Stoned_Fox.jpg/1200px-Stoned_Fox.jpg" alt="Foxy Fox" />
                    </div>
                    <div className='invite'> <span className='fa-solid user-plus'></span> Invite /</div>
                    <div className='activity'>  <span className='fa-solid chart-line'></span> Activity</div>
                    <div className='add-to-board'><span className='fa-solid plus'></span> Add to board</div>
                    <div className="options fa-solid ellipsis-h"></div>
                </div>

            </div>

            {!isDescEditOn && <div className='description'
                onClick={onToggleDescEdit}>{desc ? desc : 'Add description here'}</div>}
            {isDescEditOn &&
                <form onSubmit={onSubmitDesc}>
                    <textarea ref={decsRef} type="text" onBlur={onSubmitDesc}
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

}


export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader)