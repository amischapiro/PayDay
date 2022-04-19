import React, { useState, useRef } from 'react'
import { utilService } from '../services/util.service'
import { useDispatch } from 'react-redux'
import { userService } from '../services/user.service'
import { activityService } from '../services/activity.service'
import { addActivity } from '../store/activity.action'
import { boardService } from '../services/board.service'

export function AddStory({ board, group, updateBoard }) {

	const [txt, setTxt] = useState('')
	const [isFocused, toggleIsFocused] = useState(false)

	const dispatch = useDispatch()
	const inputEl = useRef()

	const onAddStory = async ({ target }) => {
		const value = target.value
		if (!value) return

		const newStory = utilService.createStory(value)
		const newBoard = { ...board }
		const { groupIdx } = boardService.getGroupAndIdx(board, group.id)
		onAddActivity('Story added', newStory)

		if (!newBoard.groups[groupIdx].stories || !newBoard.groups[groupIdx].stories.length) {
			newBoard.groups[groupIdx].stories = [newStory]
		} else {
			newBoard.groups[groupIdx].stories.push(newStory)
		}
		await updateBoard(newBoard)
		setTxt('')
	}

	const onAddActivity = (type, story) => {
		const currUser = userService.getMiniLoggedInUser()
		const newActivity = activityService.makeNewActivity(type, currUser, board, group, story)
		dispatch(addActivity(newActivity))
	}


	const handleUpdate = (ev) => {
		if (ev.key === 'Enter' || ev.type === 'blur') {
			onAddStory(ev)
			toggleIsFocused(false)
		}
	}

	const handleChange = ({ target }) => {
		const { value } = target
		setTxt(value)
	}

	const onFocusInput = () => {
		inputEl.current.focus()
	}

	return (
		<div className={isFocused ? "add-story focused" : "add-story"} onClick={onFocusInput}>
			<div
				className="story-selector"
				style={{
					backgroundColor: group.style.backgroundColor,
				}}></div>
			<input
				autoComplete="off"
				name="txt"
				type="text"
				placeholder="+ Add Story"
				onBlur={handleUpdate}
				onKeyUp={handleUpdate}
				value={txt}
				onClick={() => toggleIsFocused(true)}
				onChange={handleChange}
				ref={inputEl}
			/>
			<button className="add" onClick={handleUpdate}>
				Add
			</button>
			<div className="story-closer"></div>
		</div>
	)
}

