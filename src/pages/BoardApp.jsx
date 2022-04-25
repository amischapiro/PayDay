import { useState, useEffect } from 'react'
import { Switch, Route, useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import { useEffectUpdate } from '../hooks/useUpdateEffect'

import { NoBoardsPage } from './NoBoardsPage'
import { BoardNav } from '../cmps/BoardNav'
import { BoardHeader } from '../cmps/BoardHeader'
import { BoardActions } from '../cmps/BoardActions'
import { GroupList } from '../cmps/GroupList'
import { Kanban } from '../cmps/kanban/Kanban'
import { Dashboard } from '../cmps/Dashboard'
import { MobileNav } from '../cmps/MobileNav'
import { ActivityModal } from '../cmps/ActivityModal'
import { BoardList } from '../cmps/BoardList.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { Confirm } from '../cmps/layout/Confirm'


import { socketService } from '../services/socket.service'
import { userService } from '../services/user.service'
import { loadBoards, getById, updateBoard, setFilterBy, setAppLoaded } from '../store/board.action'
import { loginDemoUser, login } from '../store/user.action'
import { LoadingPage } from './LoadingPage'


export function BoardApp() {

	const { boardId } = useParams()

	const [filteredBoard, setFilteredBoard] = useState(null)
	const [isDashboard, toggleIsDashboard] = useState(false)
	const [comfirmOpen, setComfirmOpen] = useState(false)


	const { boards, selectedBoard, filterBy, isLoadingBoard, isLoadingBoards, hasAppLoaded } = useSelector(({ boardModule }) => boardModule)
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
				} else await dispatch(loginDemoUser())
				dispatch({ type: 'SET_LOADING_BOARDS', payload: true })
				await dispatch(loadBoards())
				await dispatch(setAppLoaded())
			}
		})();
		// after transition to dispatch, I will cancel this comment
		// eslint-disable-next-line
	}, [hasAppLoaded])


	useEffect(() => {
		(async () => {
			dispatch(getById(boardId))
		})();
		socketService.emit('enter board', boardId);
		socketService.on('board has updated', async (updatedBoardId) => {
			dispatch(getById(updatedBoardId))
		})
		return () => {
			socketService.off('board has updated')
		}
	}, [boardId, dispatch])


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
		await dispatch(updateBoard(newBoard))
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
			await dispatch(updateBoard(boardToUpdate))
			socketService.emit('update board', boardId)
		} catch (error) {
			console.log(error);
		}
	}

	const stopUpdate = (res) => {
		if (!res) return setComfirmOpen(false)
		dispatch(setFilterBy(null))
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



	if ((isLoadingBoard || isLoadingBoards)) return <LoadingPage />

	if (!boards.length || boardId === 'null') return <NoBoardsPage />

	return (
		<main className="main-container">
			<SideBar />
			<BoardList />
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
					<MobileNav toggleIsDashboard={toggleIsDashboard} />
					<BoardHeader updateBoard={onUpdateBoard} />
					<BoardNav toggleIsDashboard={toggleIsDashboard} />
					<BoardActions
						updateBoard={onUpdateBoard}
						updateWhileFilterSort={updateWhileFilterSort}
						onSetSort={onSetSort}
					/>
				</section>
				<div className="board-content">
					<Switch>
						<Route path="/board/:boardId/kanban">
							<Kanban
								board={filteredBoard || selectedBoard}
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
		</main>
	)
}
