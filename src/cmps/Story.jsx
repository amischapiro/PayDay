import React, { useState, useEffect } from 'react';
import { DynamicCmp } from './dynamicCmps/DynamicCmp';
import { connect } from 'react-redux'
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';

import { updateBoard } from '../store/board.action'
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
	const [editStory, setEditStory] = useState({ title: story.title })

	const titleRef = React.createRef()

	const onToggleTitleEdit = () => {
		isTitleEditOn ? toggleTitleEdit(false) : toggleTitleEdit(true)
	}


	useEffect(() => {
		if (isTitleEditOn) titleRef.current.focus()

	}, [isTitleEditOn])

	const handleChange = ({ target }) => {
		const { name, value } = target
		setEditStory({ ...editStory, [name]: value })
	}

	const onSubmitTitle = async (ev) => {
		ev.preventDefault()
		onToggleTitleEdit()
		const storyToUpdate = { ...story, title: editStory.title }
		onUpdateBoard(storyToUpdate)
	}

	const onUpdateBoard = (storyToUpdate) => {
		newBoard.groups[groupIdx].stories.splice(storyIdx, 1, storyToUpdate)
		setNewBoard(newBoard)
		updateBoard(newBoard)
	}

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
				newData = await boardService.addMember(board._id, data);
				newStory.storyData.members= newData;
				break;
			case 'CHANGE_TIMELINE':
				newData = await boardService.updateTimeline(board._id, data);
				newStory.storyData.timeline= newData;
				break;
			default:
				break;
		}
		onUpdateBoard(newStory)
	}


	return (
		<div className="story">
			<div className="story-txt-area">
				<div className="story-selector"></div>
				<div className="story-txt">
					<div className="story-editor">
						{isTitleEditOn ?
							<form onSubmit={onSubmitTitle}>
								<input ref={titleRef} type="text" onBlur={onSubmitTitle}
									value={editStory.title} name="title" onChange={handleChange} />
							</form> : <div>{story.title}</div>}
						{!isTitleEditOn && <button onClick={onToggleTitleEdit} className="edit-title">Edit</button>}
					</div>
					<MapsUgcOutlinedIcon className="update-bubble" />
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
	}
}

const mapDispatchToProps = {
	updateBoard,

}


export const Story = connect(mapStateToProps, mapDispatchToProps)(_Story)