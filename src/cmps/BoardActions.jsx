import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { utilService } from '../services/util.service';

import { NewStoryMenu } from './menus/NewStoryMenu';
import { SortMenu } from './menus/SortMenu';
import { FilterMenu } from './menus/FilterMenu'


import { userService } from '../services/user.service'
import { BoardSearch } from './BoardSearch';

function _BoardActions({ board, updateBoard, setFilterBy, filterBy, updateWhileFilter }) {

	const newBoard = { ...board };


	const onAddStory = async () => {
		if (filterBy.name || filterBy.status || filterBy.priority || filterBy.members) {
			updateWhileFilter();
			return;
		}
		const newStory = utilService.createStory();
		const newGroup = newBoard.groups[0]
		if (!newBoard.groups[0].stories || !newBoard.groups[0].stories.length)
			newBoard.groups[0].stories = [newStory];
		else newBoard.groups[0].stories.unshift(newStory);

		addNewActivity('Story added', newStory, newGroup)
		await updateBoard(newBoard);
	};

	const onAddGroup = async () => {
		if (filterBy.name || filterBy.status || filterBy.priority || filterBy.members) {
			updateWhileFilter();
			return;
		}
		const newGroup = utilService.createEmptyGroup();

		if (!newBoard.groups || !newBoard.groups.length)
			newBoard.groups = [newGroup];
		else newBoard.groups.unshift(newGroup);

		await updateBoard(newBoard);
	};

	const addNewActivity = (type, group, story) => {
		const currUser = userService.getMiniLoggedInUser()
		let newActivity = {
			id: utilService.makeId(),
			type,
			createdAt: Date.now(),
			byMember: currUser,
			group: {
				id: group.id,
				title: group.title
			},
		}
		if (story) newActivity = {
			...newActivity, story: {
				id: story.id,
				title: story.title
			}
		}
		newBoard.activities.unshift(newActivity)
	}


	return (
		<div className="board-actions">
			<div className="main-actions">
				<div className="new-story">
					<span onClick={onAddStory}>New Story</span>
					<NewStoryMenu
						board={board}
						updateBoard={updateBoard}
						onAddGroup={onAddGroup}
						onAddStory={onAddStory}
					/>
				</div>
				<BoardSearch setFilterBy={setFilterBy} filterBy={filterBy} />
				<div>
					<span className="fa user"></span>
					<span>Person</span>
				</div>
				<div className="filter">
					<span className="fa-solid filter"></span>
					<span className="btn-txt">Filter</span>
					<FilterMenu board={board} updateBoard={updateBoard} setFilterBy={setFilterBy} filterBy={filterBy} />
				</div>

				<SortMenu board={board} updateBoard={updateBoard} filterBy={filterBy} updateWhileFilter={updateWhileFilter} />

			</div>
		</div>
	);
}

function mapStateToProps(state) {
	return {
		// filterBy: state.boardModule.filterBy,
	};
}

const mapDispatchToProps = {};

export const BoardActions = connect(
	mapStateToProps,
	mapDispatchToProps
)(_BoardActions);
