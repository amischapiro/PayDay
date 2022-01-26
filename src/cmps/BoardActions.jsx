import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { utilService } from '../services/util.service';

import { NewStoryMenu } from './menus/NewStoryMenu';
import SyncAltRoundedIcon from '@mui/icons-material/SyncAltRounded';

function _BoardActions({ board, updateBoard }) {
	const newBoard = { ...board };
	
	const [isSearchOpen, setSearchOpen] = useState(false);

	const onAddStory = async () => {
		const newStory = utilService.createStory();

		if (!newBoard.groups[0].stories || !newBoard.groups[0].stories.length)
			newBoard.groups[0].stories = [newStory];
		else newBoard.groups[0].stories.unshift(newStory);

		await updateBoard(newBoard);
	};

	const onAddGroup = async () => {
		const newGroup = utilService.createEmptyGroup();

		if (!newBoard.groups || !newBoard.groups.length)
			newBoard.groups = [newGroup];
		else newBoard.groups.unshift(newGroup);

		await updateBoard(newBoard);
	};

	const onSetSort = async (type) => {
		const sortBy = newBoard.sortBy;
		if(type === sortBy.name) sortBy.order *= -1;
		else sortBy.name = type;

		let newGroups = newBoard.groups.map((group) => {
			const newStories = group.stories.sort(function (a, b) {
				switch(sortBy.name) {
					case 'name':
						if (a.title.toLowerCase() < b.title.toLowerCase()) return sortBy.order;
						else if (a.title.toLowerCase() > b.title.toLowerCase()) return sortBy.order * -1;
						else return 0;
					case 'status':
						if (a.status.id < b.status.id) return sortBy.order;
						else if (a.status.id > b.status.id) return sortBy.order * -1;
						else return 0;
					case 'priority':
						if (a.priority.id < b.priority.id) return sortBy.order;
						else if (a.priority.id > b.priority.id) return sortBy.order * -1;
						else return 0;
					default: 
						if (a.createdAt < b.createdAt) return sortBy.order;
						else if (a.createdAt > b.createdAt) return sortBy.order * -1;
						else return 0;
				}
			});

			group.stories = newStories;
			return group;
		});

		newBoard.groups = newGroups;
		await updateBoard(newBoard);
	};

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

				<div
					onClick={() => setSearchOpen(true)}
					className={isSearchOpen ? 'search-bar open' : 'search-bar'}>
					<span className="fa-solid search"></span>
					{!isSearchOpen && <span>Search</span>}
					{isSearchOpen && (
						<input
							type="text"
							placeholder="Search"
							onBlur={() => setSearchOpen(false)}
							autoFocus={true}
						/>
					)}
				</div>
				<div>
					<span className="fa user"></span>
					<span>Person</span>
				</div>
				<div className="filter">
					<span className="fa-solid filter"></span>
					<span>Filter</span>
					<span className="fa-solid chevron-down"></span>
				</div>

				<div className="sort" onClick={() => onSetSort('name')}>
					<SyncAltRoundedIcon className="sort-icon" />
					<span>Sort</span>
				</div>
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
