import React, { useState, useEffect } from 'react';
import { DynamicCmp } from './dynamicCmps/DynamicCmp';
import { connect } from 'react-redux'
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';

import { updateBoard, setStory } from '../store/board.action'
import { boardService } from '../services/board.service';

export function _Story(props) {
	const { board, group, story, updateBoard } = props;
	const { cmpsOrder } = board;
	const groupId = group.id
	const groupIdx = board.groups.findIndex((group) => group.id === groupId)
	const storyId = story.id
	const storyIdx = group.stories.findIndex(story => story.id === storyId)


	const [newBoard, setNewBoard] = useState({ ...board })

	const [isTitleEditOn, toggleTitleEdit] = useState(false)
	const [newStoryTitle, setStoryTitle] = useState({ title: story.title })

	const titleRef = React.createRef()

	useEffect(() => {
		if (isTitleEditOn) titleRef.current.focus()
	}, [isTitleEditOn])


	const handleChange = ({ target }) => {
		const { name, value } = target
		setStoryTitle({ ...newStoryTitle, [name]: value })
	}

	const onSubmitTitle = async (ev) => {
		ev.preventDefault()
		toggleTitleEdit(!isTitleEditOn)
		const storyToUpdate = { ...story, title: newStoryTitle.title }
		onUpdateBoard(storyToUpdate)
	}

	const onUpdateBoard = async (storyToUpdate) => {
		newBoard.groups[groupIdx].stories.splice(storyIdx, 1, storyToUpdate)
		setNewBoard(newBoard)
		props.onUpdateBoard(newBoard)
		const updatedBoard = await updateBoard(newBoard)
	}

	// const addStory = async (storyToUpdate) => {
	// 	newBoard.groups[groupIdx].stories.push(storyToUpdate)
	// 	setNewBoard(newBoard)
	// 	props.onUpdateBoard(newBoard)
	// 	// const updatedBoard = await updateBoard(newBoard)
	// }

	const onUpdateStory = async (dataType, data) => {
		const newStory = { ...story }
		let newData;

		switch (dataType) {
			case 'CHANGE_STATUS':
				newData = await boardService.getStatusById(board._id, data)
				newStory.storyData.status = newData
				break;
			case 'CHANGE_PRIORITY':
				newData = await boardService.getPriorityById(board._id, data)
				newStory.storyData.priority = newData
				break;
			case 'ADD_MEMBER':
				if (newStory.storyData.members.some(member => {
					return member._id === data;
				})) return;
				newData = await boardService.getMemberById(board._id, data);
				newStory.storyData.members.push(newData);
				break;
			case 'CHANGE_TIMELINE':
				newData = await boardService.updateTimeline(data);
				newStory.storyData.timeline = newData;
				// console.log('Story.jsx 💤 69: ', newStory.storyData.timeline);
				break;
			case 'CHANGE_NUMBER':
				newStory.storyData.number = data;
				break;
			default:
				break;
		}
		onUpdateBoard(newStory)
	}
	const onSetStory = async (boardId,groupId,storyId) => {
		const story = {
			boardId,
			groupId,
			storyId
		}
		await props.setStory(story)
	}

	return (
		<div className="story">
			<div className="story-txt-area">
				<div className="story-selector" style={{ backgroundColor: group.style.backgroundColor }}></div>
				<div className="story-txt">
					<div className="story-editor">
						{isTitleEditOn ?
							<form onSubmit={onSubmitTitle}>
								<input ref={titleRef} type="text" onBlur={onSubmitTitle}
									value={newStoryTitle.title} name="title" onChange={handleChange} />
							</form> : <div className="story-title">{story.title}</div>}
						{!isTitleEditOn && <button onClick={() => toggleTitleEdit(!isTitleEditOn)} className="edit-title">Edit</button>}
					</div>
					<MapsUgcOutlinedIcon onClick={() => onSetStory(board._id,group.id,story.id)} className="update-bubble" />
				</div>
			</div>
			{cmpsOrder.map((cmp, idx) => {
				return (
					<DynamicCmp
						key={idx}
						cmp={cmp}
						story={story}
						onUpdate={(dataType, data) => onUpdateStory(dataType, data)}
						// onUpdate={(data) => {
						// 	console.log('Updating:', cmp, 'with data:', data);
						// 	// make a copy, update the task
						// 	// Call action: updateTask(task)
						// }}
						board={board}
						group={group}
					/>
				);
			})}
		</div>
	);
}


function mapStateToProps({ boardModule }) {
	return {
		// board: boardModule.board,
		// users: state.userModule.users,
		// loggedInUser: state.userModule.loggedInUser
		selectedStoryIds: boardModule.activityModalStory

	}
}

const mapDispatchToProps = {
	updateBoard,
	setStory
}


export const Story = connect(mapStateToProps, mapDispatchToProps)(_Story)