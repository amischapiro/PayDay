import React from 'react'
import { useDispatch } from 'react-redux'
import { utilService } from '../services/util.service'

import { NewStoryMenu } from './menus/NewStoryMenu'
import { SortMenu } from './menus/SortMenu'
import { FilterMenu } from './menus/FilterMenu'
import { BoardSearch } from './BoardSearch'
import { PersonMenu } from './menus/PersonMenu'

import { userService } from '../services/user.service'
import { activityService } from '../services/activity.service'
import { addActivity } from '../store/activity.action'

export function BoardActions({ board, updateBoard, setFilterBy, filterBy, updateWhileFilterSort, onSetSort }) {

	const dispatch = useDispatch()
	const newBoard = { ...board }

	const onAddStory = async () => {
		if (filterBy || board.sortBy.name) return updateWhileFilterSort()
		const newStory = utilService.createStory()
		const newGroup = newBoard.groups[0] || utilService.createEmptyGroup()

		if (!newBoard.groups || !newBoard.groups.length) {
			newBoard.groups = [newGroup]
		} else if (!newBoard.groups[0].stories || !newBoard.groups[0].stories.length) {
			newBoard.groups[0].stories = [newStory]
		} else newBoard.groups[0].stories.unshift(newStory)

		onAddActivity('Story added', newGroup, newStory)
		await updateBoard(newBoard)
	}

	const onAddGroup = async () => {
		if (filterBy || board.sortBy.name) return updateWhileFilterSort()
		const newGroup = utilService.createEmptyGroup()
		if (!newBoard.groups || !newBoard.groups.length) newBoard.groups = [newGroup]
		else newBoard.groups.unshift(newGroup)
		onAddActivity('Group added', newGroup)
		await updateBoard(newBoard)
	}

	const onAddActivity = (type, group, story) => {
		const currUser = userService.getMiniLoggedInUser()
		const newActivity = activityService.makeNewActivity(type, currUser, board, group, story)
		dispatch(addActivity(newActivity))
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

				<PersonMenu members={board.members} setFilterBy={setFilterBy} filterBy={filterBy} />

				<div className="filter">
					<span className="fa-solid filter"></span>
					<span className="btn-txt actions-text">Filter</span>
					<FilterMenu board={board} updateBoard={updateBoard} setFilterBy={setFilterBy} />
				</div>

				<SortMenu onSetSort={onSetSort} />

			</div>
		</div>
	)
}

