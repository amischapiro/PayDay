import React, { useState, useEffect } from 'react';

import { Switch, Route } from 'react-router';

import { BoardNav } from '../cmps/BoardNav';
import { BoardHeader } from '../cmps/BoardHeader';
import { BoardActions } from '../cmps/BoardActions';
import { GroupList } from '../cmps/GroupList';
import { Kanban } from '../cmps/kanban/Kanban';
import { Dashboard } from '../cmps/Dashboard';
import { MobileNav } from '../cmps/MobileNav';

import { ActivityModal } from '../cmps/ActivityModal';

import { socketService } from '../services/socket.service';
import { SideBar } from '../cmps/SideBar.jsx';
import { BoardList } from '../cmps/BoardList.jsx';
import { connect } from 'react-redux';
import { loadBoards, getById, removeBoard, updateBoard, addBoard, setStory, setFilterBy, } from '../store/board.action';


function _BoardApp({ match, loadBoards, getById, boards, selectedBoard, updateBoard, removeBoard, addBoard, setStory, selectedStoryIds, setFilterBy, filterBy }) {

	const { boardId } = match.params;
	const [filteredBoard, setFilteredBoard] = useState(null);

	useEffect(() => {
		async function fetchData() {
			await loadBoards();
			await getById(boardId);
		}
		fetchData()
		socketService.setup();
		socketService.on('board has updated', async (updatedBoardId) => {
			console.log('BoardApp.jsx 💤 40: ', updatedBoardId);
			await getById(updatedBoardId);
		});
		return () => {
			socketService.terminate();
		};
	}, [boardId, getById, loadBoards]);
	// Original dependencies: []


	useEffect(() => {
		async function fetchData() {
			await getById(boardId);
			setFilterBy({
				name: null,
				priority: null,
				status: null,
				members: null,
			});
		}
		fetchData()
		socketService.emit('enter board', boardId);
	}, [match.params, boardId, getById, loadBoards, setFilterBy]);
	// Original dependecies: match.params

	useEffect(() => {
		async function fetchData() {

			const board = JSON.parse(JSON.stringify(selectedBoard));

			if (filterBy) {
				if (filterBy?.name)
					board.groups.forEach((group, idx) => {
						const stories = group.stories.filter((story) => {
							return story.title
								.toLowerCase()
								.includes(filterBy.name);
						});
						board.groups[idx].stories = stories;
					});

				if (filterBy?.priority)
					board.groups.forEach((group, idx) => {
						const stories = group.stories.filter((story) => {
							return (
								story.storyData.priority.title === filterBy.priority
							);
						});
						board.groups[idx].stories = stories;
					});

				if (filterBy?.status)
					board.groups.forEach((group, idx) => {
						const stories = group.stories.filter((story) => {
							return story.storyData.status.title === filterBy.status;
						});
						board.groups[idx].stories = stories;
					});

				if (filterBy?.members)
					board.groups.forEach((group, idx) => {
						const stories = group.stories.filter((story) => {
							return story.storyData.status.members.some((member) => {
								return filterBy.members.some((filterMem) => {
									return filterMem.id === member._id;
								});
							});
						});
						board.groups[idx].stories = stories;
					});
			}

			setFilteredBoard(board);

		}
		fetchData()
	}, [filterBy, selectedBoard])



	// useEffect(() => {
	// 	filterBoard(filterBy);
	// }, [filterBy]);

	const onUpdateBoard = async (boardToUpdate) => {
		if (filterBy.name || filterBy.status || filterBy.priority || filterBy.members) {
			updateWhileFilter();
			return;
		}
		await updateBoard(boardToUpdate);
		socketService.emit('update board', boardId);
	};

	const onRemoveStory = async () => {
		if (filterBy.name || filterBy.status || filterBy.priority || filterBy.members) {
			updateWhileFilter();
			return;
		}
		const story = {
			boardId: null,
			groupId: null,
			storyId: null,
		};
		await setStory(story);
	};

	// const filterBoard = async (filterBy) => {
	// 	const board = JSON.parse(JSON.stringify(selectedBoard));

	// 	if (filterBy) {
	// 		if (filterBy?.name)
	// 			board.groups.forEach((group, idx) => {
	// 				const stories = group.stories.filter((story) => {
	// 					return story.title
	// 						.toLowerCase()
	// 						.includes(filterBy.name);
	// 				});
	// 				board.groups[idx].stories = stories;
	// 			});

	// 		if (filterBy?.priority)
	// 			board.groups.forEach((group, idx) => {
	// 				const stories = group.stories.filter((story) => {
	// 					return (
	// 						story.storyData.priority.title === filterBy.priority
	// 					);
	// 				});
	// 				board.groups[idx].stories = stories;
	// 			});

	// 		if (filterBy?.status)
	// 			board.groups.forEach((group, idx) => {
	// 				const stories = group.stories.filter((story) => {
	// 					return story.storyData.status.title === filterBy.status;
	// 				});
	// 				board.groups[idx].stories = stories;
	// 			});

	// 		if (filterBy?.members)
	// 			board.groups.forEach((group, idx) => {
	// 				const stories = group.stories.filter((story) => {
	// 					return story.storyData.status.members.some((member) => {
	// 						return filterBy.members.some((filterMem) => {
	// 							return filterMem.id === member._id;
	// 						});
	// 					});
	// 				});
	// 				board.groups[idx].stories = stories;
	// 			});
	// 	}

	// 	setFilteredBoard(board);
	// };

	const updateWhileFilter = () => {
		// eslint-disable-next-line no-restricted-globals
		const isNulifyFilter = confirm("You can't make any changes to your board while filter is on, would you like to cancel the filter?");
		if (isNulifyFilter) {
			setFilterBy({
				name: null,
				priority: null,
				status: null,
				members: null,
			});
			alert('Filter cleared!');
		}
	};

	if (!boards?.length)
		return (
			<main className="main-container">
				<SideBar />
				<BoardList
					boards={boards}
					currBoard={selectedBoard}
					removeBoard={removeBoard}
					addBoard={addBoard}
					loadBoards={loadBoards}
				/>
				<div className="loader"></div>
			</main>
		);

	if (!selectedBoard) return <div className="loader"></div>;

	return (
		<main className="main-container">
			<SideBar />
			<BoardList
				boards={boards}
				currBoard={selectedBoard}
				loadBoards={loadBoards}
				removeBoard={removeBoard}
				addBoard={addBoard}
			/>

			<section className="main-content">
				<section className="main-header">
					<MobileNav selectedBoard={selectedBoard} boards={boards} />
					<BoardHeader
						board={selectedBoard}
						updateBoard={onUpdateBoard}
					/>
					<BoardNav board={selectedBoard} />
					<BoardActions
						board={selectedBoard}
						updateBoard={onUpdateBoard}
						getById={getById}
						setFilterBy={setFilterBy}
						filterBy={filterBy}
						updateWhileFilter={updateWhileFilter}
					/>
				</section>
				<div className="board-content">
					<Switch className="board-switch-container">
						<Route path="/board/:boardId/kanban">
							<Kanban board={filteredBoard || selectedBoard}
								filterBy={filterBy}
								updateBoard={onUpdateBoard}
								updateWhileFilter={updateWhileFilter}
							/>
						</Route>
						<Route path="/board/:boardId/dashboard">
							<Dashboard />
						</Route>
						<Route path="/board/:boardId/board">
							<GroupList
								board={filteredBoard || selectedBoard}
								filterBy={filterBy}
								updateBoard={onUpdateBoard}
								updateWhileFilter={updateWhileFilter}
							/>
						</Route>
					</Switch>
					<ActivityModal
						boards={boards}
						selectedBoard={selectedBoard}
						updateBoard={onUpdateBoard}
					/>
				</div>
			</section>

			<div
				onClick={() => onRemoveStory()}
				className={`darken-screen ${selectedStoryIds.storyId ? 'open' : ''
					}`}></div>
		</main>
	);
}

function mapStateToProps({ boardModule }) {
	return {
		boards: boardModule.boards,
		selectedStoryIds: boardModule.activityModalStory,
		selectedBoard: boardModule.selectedBoard,
		filterBy: boardModule.filterBy,
		// users: state.userModule.users,
		// loggedInUser: state.userModule.loggedInUser
	};
}

const mapDispatchToProps = {
	loadBoards,
	getById,
	removeBoard,
	updateBoard,
	addBoard,
	setStory,
	setFilterBy,
};

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp);
