import React, { useState, useEffect } from 'react';
import { DynamicCmp } from './dynamicCmps/DynamicCmp';
import { connect } from 'react-redux';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';

import { setStory } from '../store/board.action';
import { boardService } from '../services/board.service';

export function _Story(props) {
	const { board, group, story, updateBoard } = props;

	const { cmpsOrder } = board;
	const newBoard = { ...board };
	const groupId = group.id;
	const groupIdx = board.groups.findIndex((group) => group.id === groupId);
	const storyId = story.id;
	const storyIdx = group.stories.findIndex((story) => story.id === storyId);

	const [isTitleEditOn, toggleTitleEdit] = useState(false);
	const [newStoryTitle, setStoryTitle] = useState({ title: story.title });

	const titleRef = React.createRef();

	useEffect(() => {
		if (isTitleEditOn) titleRef.current.focus();
	}, [isTitleEditOn]);

	const handleChange = ({ target }) => {
		const { name, value } = target;
		setStoryTitle({ ...newStoryTitle, [name]: value });
	};

	const onSubmitTitle = async (ev) => {
		ev.preventDefault();
		toggleTitleEdit(!isTitleEditOn);
		const storyToUpdate = { ...story, title: newStoryTitle.title };
		onUpdateBoard(storyToUpdate);
	};

	const onUpdateBoard = async (storyToUpdate) => {
		newBoard.groups[groupIdx].stories.splice(storyIdx, 1, storyToUpdate);
		await updateBoard(newBoard);
	};

	const onUpdateStory = async (dataType, data) => {
		const newStory = { ...story };
		let newData;

		switch (dataType) {
			case 'CHANGE_STATUS':
				newData = await boardService.getStatusById(board._id, data);
				newStory.storyData.status = newData;
				break;
			case 'CHANGE_PRIORITY':
				newData = await boardService.getPriorityById(board._id, data);
				newStory.storyData.priority = newData;
				break;
			case 'ADD_MEMBER':
				if (
					newStory.storyData.members.some((member) => {
						return member._id === data;
					})
				)
					return;
				newData = await boardService.getMemberById(board._id, data);
				newStory.storyData.members.push(newData);
				break;
			case 'CHANGE_TIMELINE':
				newData = await boardService.updateTimeline(data);
				newStory.storyData.timeline = newData;
				break;
			case 'CHANGE_NUMBER':
				newStory.storyData.number = data;
				break;
			case 'CHANGE_LINK':
				console.log('Story.jsx 💤 85: ', data);
				break;
			default:
				break;
		}
		onUpdateBoard(newStory);
	};
	const onSetStory = async (boardId, groupId, storyId) => {
		const story = {
			boardId,
			groupId,
			storyId,
		};
		await props.setStory(story);
	};

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
										ref={titleRef}
										type="text"
										onBlur={onSubmitTitle}
										value={newStoryTitle.title}
										name="title"
										onChange={handleChange}
									/>
								</form>
							) : (
								<div className="story-title">{story.title}</div>
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
						<div className='story-update-icons' ><MapsUgcOutlinedIcon
							onClick={() =>
								onSetStory(board._id, group.id, story.id)
							}
							className="update-bubble"
						/>{story.comments?.length?<div className='updates-count-bubble'>{story.comments.length}</div>:'' }
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
					);
				})}
			</div>
			<div className="story-close-wrapper">
				<div className="add-col"></div>
				<div className="story-closer"></div>
			</div>
		</div>
	);
}

function mapStateToProps({ boardModule }) {
	return {
		// board: boardModule.board,
		// users: state.userModule.users,
		// loggedInUser: state.userModule.loggedInUser
		selectedStoryIds: boardModule.activityModalStory,
	};
}

const mapDispatchToProps = {
	setStory,
};

export const Story = connect(mapStateToProps, mapDispatchToProps)(_Story);
