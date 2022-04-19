import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { setStory } from '../store/board.action';
import { toggleBoardActivityModal } from '../store/activity.actions'
import { socketService } from '../services/socket.service';

export function _BoardHeader({ board, updateBoard, setStory }) {

    const { title, desc, members } = board

    const [isTitleEditOn, toggleTitleEdit] = useState(false)
    const [isDescEditOn, toggleDescEdit] = useState(false)
    const [isDescShow, toggleisDescShow] = useState(false)
    const [editBoard, setEditBoard] = useState({ title, desc: desc || '' })

    const titleRef = React.createRef()
    const descRef = React.createRef()

    const dispatch = useDispatch()

    useEffect(() => {
        if (isTitleEditOn) titleRef.current.focus()
        if (isDescEditOn) descRef.current.focus()

    }, [isTitleEditOn, isDescEditOn, titleRef, descRef])


    useEffect(() => {
        setEditBoard({ title, desc })
    }, [board, title, desc])


    const handleChange = ({ target }) => {
        const { name, value } = target
        if (value === ' ' || value === '\n') return
        setEditBoard({ ...editBoard, [name]: value })
    }

    const onSubmitTitle = async (ev) => {
        ev.preventDefault()
        toggleTitleEdit(false)
        const boardToUpdate = { ...board, title: editBoard.title }
        await updateBoard(boardToUpdate)
        socketService.emit('update workspace')
    }

    const onSubmitDesc = async (ev) => {
        ev.preventDefault()
        toggleDescEdit(false)
        const boardToUpdate = { ...board, desc: editBoard.desc }
        await updateBoard(boardToUpdate)
        socketService.emit('update workspace')
    }



    const onSetStory = async () => {
        const story = {
            boardId: board._id,
            groupId: 'none',
            storyId: 'none',
        };
        await setStory(story);
        dispatch(toggleBoardActivityModal())
        // dispatch({ type: 'SET_SELECTED_STORY_IDS', payload: { groupId: null, storyId: null } })
        // dispatch({ type: 'SET_IS_OPEN', payload: true })
    }



    return (
        <div className='board-header'>

            <div className='title-and-action'>

                <div className='title-section'>
                    {!isTitleEditOn ? (
                        <h3 onClick={() => { toggleTitleEdit(true) }}>{title ? title : 'Enter title here'}</h3>
                    ) : (
                        <form onSubmit={onSubmitTitle}>
                            <input ref={titleRef} type="text" onBlur={onSubmitTitle}
                                value={editBoard.title} name="title" onChange={handleChange} />
                        </form>
                    )}
                    <div onClick={() => { toggleisDescShow(!isDescShow) }} className='fa-solid info-circle'></div>
                    <div className='fa star'></div>
                </div>

                <div className='header-actions'>
                    <div className='last-seen'>
                        Last seen
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Stoned_Fox.jpg/1200px-Stoned_Fox.jpg" alt="Foxy Fox" />
                    </div>
                    <div className='invite'> <span className='fa-solid user-plus'></span> Invite / {members.length} </div>
                    <div className='activity' onClick={onSetStory}>  <span className='fa-solid chart-line'></span> Activity</div>
                    <div className='add-to-board'><span className='fa-solid plus'></span> Add to board</div>
                    <div className="options fa-solid ellipsis-h"></div>
                </div>

            </div>
            {!isDescShow &&
                <React.Fragment>
                    {!isDescEditOn ? (
                        <div className='description'
                            onClick={() => { toggleDescEdit(true) }}>{desc ? desc : 'Add description here'}</div>
                    ) : (
                        <form onSubmit={onSubmitDesc}>
                            <textarea ref={descRef} type="text" onBlur={onSubmitDesc}
                                value={editBoard.desc} name="desc" onChange={handleChange} />
                        </form>
                    )}
                </React.Fragment>
            }
        </div>
    )
}


function mapStateToProps({ boardModule }) {
    return {
    };
}

const mapDispatchToProps = {
    setStory,
};

export const BoardHeader = connect(mapStateToProps, mapDispatchToProps)(_BoardHeader);
