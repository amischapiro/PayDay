import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { utilService } from '../services/util.service';

import { NewStoryMenu } from './menus/NewStoryMenu';
import SyncAltRoundedIcon from '@mui/icons-material/SyncAltRounded';

function _BoardActions({ board, updateBoard }) {
	const [isSearchOpen, setSearchOpen] = useState(false);

	const onAddStory = async () => {
		const newStory = utilService.createStory();
		const newBoard = { ...board };

		if (!newBoard.groups[0].stories || !newBoard.groups[0].stories.length)
			newBoard.groups[0].stories = [newStory];
		else newBoard.groups[0].stories.unshift(newStory);

		await updateBoard(newBoard);
	};

	const onAddGroup = async () => {
		const newGroup = utilService.createEmptyGroup();
		const newBoard = { ...board };

		if (!newBoard.groups || !newBoard.groups.length)
			newBoard.groups = [newGroup];
		else newBoard.groups.unshift(newGroup);

		await updateBoard(newBoard);
	};

	const onSetSort = async (type) => {
        // console.log('BoardActions.jsx 💤 34: ', 'here');
		// const newBoard = JSON.parse(JSON.stringify(board));
        return;
        // const newBoard = { ...board };
        // console.log('BoardActions.jsx 💤 36: ', board);
        // console.log('BoardActions.jsx 💤 37: ', newBoard);
		// const sortBy = newBoard.sortBy;
        // sortBy.name = type;
		// switch (sortBy.name) {
		// 	case 'name':
		// 		newBoard.groups = board.groups.map((group) => {
		// 			return group.stories.sort(function (a, b) {
		// 				if (a.title < b.title) return group.order;
		// 				else if (a.title > b.title) return group.order * -1;
		// 				else return 0;
		// 			});
		// 		    });
		// 		break;
		// 	case 'date':
		// 		newBoard.groups = board.groups.map((group) => {
		// 			return group.stories.sort(function (a, b) {
		// 				if (a.createdAt < b.createdAt) return group.order;
		// 				else if (a.createdAt > b.createdAt) return group.order * -1;
		// 				else return 0;
		// 			});
		// 		    });
		// 		break;
		// 	default:
		// 		break;
		// }
		// await updateBoard(newBoard);
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
