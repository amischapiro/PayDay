import { useState, useEffect } from 'react'
import { Switch, Route, useParams } from 'react-router'
import { useEffectUpdate } from '../hooks/useUpdateEffect'
import { AnimatePresence } from 'framer-motion'

import { BoardNav } from '../cmps/BoardNav'
import { BoardHeader } from '../cmps/BoardHeader'
import { BoardActions } from '../cmps/BoardActions'
import { GroupList } from '../cmps/GroupList'
import { Kanban } from '../cmps/kanban/Kanban'
import { Dashboard } from '../cmps/Dashboard'
import { MobileNav } from '../cmps/MobileNav'

import { ActivityModal } from '../cmps/ActivityModal'

import { socketService } from '../services/socket.service'
import { SideBar } from '../cmps/SideBar.jsx'
import { BoardList } from '../cmps/BoardList.jsx'
import { connect, useDispatch, useSelector } from 'react-redux'
import { loadBoards, getById, removeBoard, updateBoard, addBoard, setStory, setFilterBy, setAppLoaded } from '../store/board.action'
import { loginDemoUser, login } from '../store/user.action'
import { NoBoardsPage } from './NoBoardsPage'
import { Loader } from '../cmps/layout/Loader'
import { userService } from '../services/user.service'
import { Confirm } from '../cmps/layout/Confirm'


function _BoardApp({ loadBoards, getById, boards, selectedBoard, updateBoard, removeBoard, addBoard, setStory, selectedStoryIds, setFilterBy, filterBy, loginDemoUser }) {

	const { boardId } = useParams()

	const [filteredBoard, setFilteredBoard] = useState(null)
	const [isDashboard, toggleIsDashboard] = useState(false)
	const [comfirmOpen, setComfirmOpen] = useState(false)

	const { isLoadingBoard, isLoadingBoards, hasAppLoaded } = useSelector(({ boardModule }) => boardModule)
	const { loggedinUser } = useSelector(({ userModule }) => userModule)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch({ type: 'SET_LOADING_BOARD', payload: true })
	}, [dispatch])


	// For use if duplicating tabs or copying link to a new one
	// Need to change if we switch to local storage
	useEffect(() => {
		(async () => {
			if (!hasAppLoaded) {
				if (loggedinUser) {
					const user = userService.getMiniLoggedInUser()
					login(user)
				} else await loginDemoUser()
				dispatch({ type: 'SET_LOADING_BOARDS', payload: true })
				await loadBoards()
				await setAppLoaded()
			}
		})();
		// after transition to dispatch, I will cancel this comment
		// eslint-disable-next-line
	}, [hasAppLoaded])


	useEffect(() => {
		(async () => {
			await getById(boardId)
		})();
		socketService.emit('enter board', boardId);
		socketService.on('board has updated', async (updatedBoardId) => {
			await getById(updatedBoardId)
		})
		return () => {
			socketService.off('board has updated')
		}
	}, [boardId, getById])


	useEffectUpdate(() => {

		const board = JSON.parse(JSON.stringify(selectedBoard))

		if (filterBy) {
			if (filterBy.name) {
				board.groups.forEach((group, idx) => {
					const stories = group.stories.filter((story) => {
						return story.title.toLowerCase()
							.includes(filterBy.name.toLowerCase())
					})
					board.groups[idx].stories = stories
				})
			}
			if (filterBy.priority) {
				board.groups.forEach((group, idx) => {
					const stories = group.stories.filter((story) => {
						return (
							story.storyData.priority.id === filterBy.priority
						)
					})
					board.groups[idx].stories = stories
				})
			}
			if (filterBy.status) {
				board.groups.forEach((group, idx) => {
					const stories = group.stories.filter((story) => {
						return story.storyData.status.id === filterBy.status
					})
					board.groups[idx].stories = stories
				})
			}
			if (filterBy.type) {
				board.groups.forEach((group, idx) => {
					const stories = group.stories.filter((story) => {
						return story.storyData.type.id === filterBy.type
					})
					board.groups[idx].stories = stories
				})
			}
			if (filterBy.members) {
				board.groups.forEach((group, idx) => {
					const stories = group.stories.filter((story) => {
						return story.storyData.members.some((member) => {
							return member._id === filterBy.members
						})
					})
					board.groups[idx].stories = stories
				})
			}
		}

		setFilteredBoard(board);

	}, [filterBy, selectedBoard])

	const onSetSort = async (type) => {
		const newBoard = JSON.parse(JSON.stringify(selectedBoard))
		const sortBy = newBoard.sortBy
		if (type === sortBy.name) sortBy.order *= -1
		else {
			sortBy.name = type
			sortBy.order = -1
		}

		let newGroups = newBoard.groups.map((group) => {
			const newStories = group.stories.sort(function (a, b) {
				switch (sortBy.name) {
					case 'name':
						if (a.title.toLowerCase() < b.title.toLowerCase()) return sortBy.order
						else if (a.title.toLowerCase() > b.title.toLowerCase()) return sortBy.order * -1
						else return 0
					case 'status':
						if (a.storyData.status.id < b.storyData.status.id) return sortBy.order
						else if (a.storyData.status.id > b.storyData.status.id) return sortBy.order * -1
						else return 0
					case 'priority':
						if (a.storyData.priority.id < b.storyData.priority.id) return sortBy.order
						else if (a.storyData.priority.id > b.storyData.priority.id) return sortBy.order * -1
						else return 0
					case 'people':
						if (a.storyData.members.length < b.storyData.members.length) return sortBy.order
						else if (a.storyData.members.length > b.storyData.members.length) return sortBy.order * -1
						else return 0
					case 'SP':
						if (a.storyData.number < b.storyData.number) return sortBy.order
						else if (a.storyData.number > b.storyData.number) return sortBy.order * -1
						else return 0
					default:
						if (a.createdAt < b.createdAt) return sortBy.order
						else if (a.createdAt > b.createdAt) return sortBy.order * -1
						else return 0
				}
			})

			group.stories = newStories
			return group
		})

		newBoard.groups = newGroups
		await updateBoard(newBoard)
	}

	const onSetCol = (col) => {
		const newBoard = JSON.parse(JSON.stringify(selectedBoard))
		if (newBoard.cmpsOrder.some(cmp => { return cmp === col })) {
			const filteredCmps = newBoard.cmpsOrder.filter(cmp => {
				return cmp !== col
			})
			newBoard.cmpsOrder = filteredCmps
		} else {
			newBoard.cmpsOrder.push(col)
		}

		onUpdateBoard(newBoard)
	}

	const onUpdateBoard = async (boardToUpdate) => {
		if (filterBy || selectedBoard?.sortBy.name) return setComfirmOpen(true)
		try {
			await updateBoard(boardToUpdate)
			socketService.emit('update board', boardId)
		} catch (error) {
			console.log(error);
		}
	}


	const onRemoveStory = async () => {
		if (filterBy || selectedBoard?.sortBy.name) return updateWhileFilterSort()
		const story = {
			boardId: null,
			groupId: null,
			storyId: null,
		}
		await setStory(story)
	}

	const stopUpdate = (res) => {
		if (!res) return setComfirmOpen(false)
		setFilterBy(null)
		onSetSort(null)
		setComfirmOpen(false)
	}


	const updateWhileFilterSort = () => {
		setComfirmOpen(true)
	}

	// const updateWhileFilterSort = () => {
	// 	const isNulifyFilterSort = window.confirm("You can't make any changes to your board while filter or sort are on, would you like to cancel filter and sort?")
	// 	if (isNulifyFilterSort) {
	// 		setFilterBy(null)
	// 		onSetSort(null)
	// 	}
	// }



	if ((isLoadingBoard || isLoadingBoards)) return <Loader />

	if (!boards.length || boardId === 'null') return (
		<NoBoardsPage boards={boards} currBoard={selectedBoard} removeBoard={removeBoard}
			addBoard={addBoard} loadBoards={loadBoards} />
	)

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

			<AnimatePresence>
				{comfirmOpen && (
					<Confirm
						acceptText="Yes"
						declineText="No"
						message="You can't make any changes to your board while filter or sort are on"
						message2="Would you like to cancel filter and sort?"
						onDecision={stopUpdate}
					/>
				)}
			</AnimatePresence>

			<section className={`main-content ${isDashboard ? "dashboard" : ""}`}>
				<section className="main-header">
					<MobileNav selectedBoard={selectedBoard} boards={boards} toggleIsDashboard={toggleIsDashboard} />
					<BoardHeader
						board={selectedBoard}
						updateBoard={onUpdateBoard}
					/>
					<BoardNav board={selectedBoard} toggleIsDashboard={toggleIsDashboard} />
					<BoardActions
						board={selectedBoard}
						updateBoard={onUpdateBoard}
						getById={getById}
						setFilterBy={setFilterBy}
						filterBy={filterBy}
						updateWhileFilterSort={updateWhileFilterSort}
						onSetSort={onSetSort}
					/>
				</section>
				<div className="board-content">
					<Switch className="board-switch-container">
						<Route path="/board/:boardId/kanban">
							<Kanban board={filteredBoard || selectedBoard}
								filterBy={filterBy}
								updateBoard={onUpdateBoard}
								updateWhileFilterSort={updateWhileFilterSort}
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
								updateWhileFilterSort={updateWhileFilterSort}
								onSetCol={onSetCol}
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
				className={`darken-screen ${selectedStoryIds.storyId ? 'open' : ''}`}>
			</div>
		</main>
	)
}


function mapStateToProps({ boardModule }) {
	return {
		boards: boardModule.boards,
		selectedStoryIds: boardModule.activityModalStory,
		selectedBoard: boardModule.selectedBoard,
		filterBy: boardModule.filterBy,

	}
}

const mapDispatchToProps = {
	loadBoards,
	getById,
	removeBoard,
	updateBoard,
	addBoard,
	setStory,
	setFilterBy,
	loginDemoUser
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)
