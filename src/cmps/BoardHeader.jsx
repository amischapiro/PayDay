import React, { useEffect, useState } from 'react'



export function BoardHeader({ board, updateBoard }) {

    const { title, desc } = board

    const [isTitleEditOn, toggleTitleEdit] = useState(false)
    const [isDescEditOn, toggleDescEdit] = useState(false)
    const [editBoard, setEditBoard] = useState({ title, desc: desc || '' })

    const titleRef = React.createRef()
    const decsRef = React.createRef()

    const { members } = board

    console.log(members);

    useEffect(() => {
        if (isTitleEditOn) titleRef.current.focus()
        if (isDescEditOn) decsRef.current.focus()

    }, [isTitleEditOn, isDescEditOn])



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
    }

    const onSubmitDesc = async (ev) => {
        ev.preventDefault()
        toggleDescEdit(false)
        const boardToUpdate = { ...board, desc: editBoard.desc }
        await updateBoard(boardToUpdate)
    }



    return (
        <div className='board-header'>

            <div className='title-and-action'>

                <div className='title-section'>
                    {!isTitleEditOn && <h3 onClick={() => { toggleTitleEdit(true) }}>{title ? title : 'Enter title here'}</h3>}
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
                    <div className='invite'> <span className='fa-solid user-plus'></span> Invite / {members.length} </div>
                    <div className='activity'>  <span className='fa-solid chart-line'></span> Activity</div>
                    <div className='add-to-board'><span className='fa-solid plus'></span> Add to board</div>
                    <div className="options fa-solid ellipsis-h"></div>
                </div>

            </div>

            {!isDescEditOn && <div className='description'
                onClick={() => { toggleDescEdit(true) }}>{desc ? desc : 'Add description here'}</div>}
            {isDescEditOn &&
                <form onSubmit={onSubmitDesc}>
                    <textarea ref={decsRef} type="text" onBlur={onSubmitDesc}
                        value={editBoard.desc} name="desc" onChange={handleChange} />
                </form>}




        </div>
    )
}

