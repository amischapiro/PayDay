import React, { useState } from 'react'
import { DynamicCmp } from './dynamicCmps/DynamicCmp'
import { useDispatch } from 'react-redux'
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined'

import { boardService } from '../services/board.service'
import { userService } from '../services/user.service'
import { addActivity, toggleStoryActivityModal } from '../store/activity.action'
import { activityService } from '../services/activity.service'


export function Story({ board, group, story, updateBoard, filterBy, updateWhileFilterSort }) {


	const { cmpsOrder } = board
	const newBoard = { ...board }
	const groupId = group.id
	const storyId = story.id
	const { groupIdx } = boardService.getGroupAndIdx(board, groupId)
	const { storyIdx } = boardService.getStoryAndIdx(board, groupIdx, storyId)

	const [isTitleEditOn, toggleTitleEdit] = useState(false)
	const [newStoryTitle, setStoryTitle] = useState({ title: story.title })

	const dispatch = useDispatch()

	const handleChange = ({ target }) => {
		const { name, value } = target
		setStoryTitle({ ...newStoryTitle, [name]: value })
	}

	const onSubmitTitle = async (ev) => {
		ev.preventDefault()
		if (filterBy || board.sortBy.name) return updateWhileFilterSort()
		toggleTitleEdit(false)
		const storyToUpdate = { ...story, title: newStoryTitle.title }
		onUpdateBoard(storyToUpdate)
	}

	const onUpdateBoard = async (storyToUpdate) => {
		newBoard.groups[groupIdx].stories.splice(storyIdx, 1, storyToUpdate)
		await updateBoard(newBoard)
	}

	const onUpdateStory = async (action, data) => {
		if (filterBy || board.sortBy.name) return updateWhileFilterSort()
		const newStory = { ...story }
		let newData

		switch (action) {
			case 'CHANGE_STATUS':
				newData = await boardService.getStatusById(board._id, data)
				newStory.storyData.status = newData
				onAddActivity('Status changed')
				break
			case 'CHANGE_PRIORITY':
				newData = await boardService.getPriorityById(board._id, data)
				newStory.storyData.priority = newData
				onAddActivity('Priority changed')
				break
			case 'ADD_MEMBER':
				newData = await boardService.getMemberById(board._id, data)
				const memberIdx = newStory.storyData.members.findIndex((member) => {
					return member._id === data
				})

				if (memberIdx >= 0) newStory.storyData.members.splice(memberIdx, 1)
				else newStory.storyData.members.push(newData)
				onAddActivity('Member added')
				break
			case 'CHANGE_TIMELINE':
				newData = await boardService.updateTimeline(data)
				newStory.storyData.timeline = newData
				onAddActivity('Timeline changed')
				break
			case 'CHANGE_NUMBER':
				newStory.storyData.number = data
				onAddActivity('Number added')
				break
			case 'CHANGE_LINK':
				newStory.storyData.link = data
				onAddActivity('Link changed')
				break
			case 'CHANGE_DUE_DATE':
				newStory.storyData.dueDate = data
				onAddActivity('Due date changed')
				break
			case 'CHANGE_TYPE':
				newData = await boardService.getTypeById(board._id, data)
				newStory.storyData.type = newData
				onAddActivity('Type changed')
				break
			default:
				break
		}
		onUpdateBoard(newStory)
	}

	const onAddActivity = (type) => {
		const currUser = userService.getMiniLoggedInUser()
		const newActivity = activityService.makeNewActivity(type, currUser, board, group, story)
		dispatch(addActivity(newActivity))
	}



	return (
		<div className="story">
			<div className="story-wrapper">
				<div className="story-txt-area">
					<div
						className="story-selector"
						style={{
							backgroundColor: group.style.backgroundColor,
						}}></div>
					<div className="story-txt">
						<div className="story-editor">
							{isTitleEditOn ? (
								<form onSubmit={onSubmitTitle}>
									<input
										autoFocus={true}
										type="text"
										onBlur={onSubmitTitle}
										value={newStoryTitle.title}
										name="title"
										onChange={handleChange}
									/>
								</form>
							) : (
								<div className="story-title" onClick={() => toggleTitleEdit(!isTitleEditOn)} >{story.title}</div>
							)}
							{!isTitleEditOn && (
								<button
									onClick={() =>
										toggleTitleEdit(!isTitleEditOn)
									}
									className="edit-title">
									Edit
								</button>
							)}
						</div>
						<div className="story-update-icons">
							<MapsUgcOutlinedIcon
								onClick={() => dispatch(toggleStoryActivityModal(groupId, storyId))}
								className={`update-bubble ${story.comments?.length ? 'blue' : ''}`}
							/>
							{story.comments?.length ? (
								<div className="updates-count-bubble">
									{story.comments.length}
								</div>
							) : (
								''
							)}
						</div>
					</div>
				</div>
				{cmpsOrder.map((cmp, idx) => {
					return (
						<DynamicCmp
							key={idx}
							cmp={cmp}
							story={story}
							onUpdate={(dataType, data) =>
								onUpdateStory(dataType, data)
							}
							board={board}
							group={group}
						/>
					)
				})}
			</div>
			<div className="story-close-wrapper">
				<div className="add-col"></div>
				<div className="story-closer"></div>
			</div>
		</div>
	)
}

