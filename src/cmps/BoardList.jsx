import { useState, useEffect } from 'react'

import { BoardPreview } from './BoardPreview'
import { utilService } from '../services/util.service'
import { socketService } from '../services/socket.service'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadBoards, addBoard } from '../store/board.action'

export function BoardList() {

	const { selectedBoard: currBoard, boards } = useSelector(({ boardModule }) => boardModule)
	const dispatch = useDispatch()

	const [anchorEl, setAnchorEl] = useState(null)
	const [isBoardListOpen, toggleBoardList] = useState(true)

	const history = useHistory()

	useEffect(() => {
		socketService.emit('enter workspace')
		socketService.on('workspace has updated', async () => {
			await dispatch(loadBoards())
		})
		return () => {
			socketService.off('workspace has updated')
		}
	}, [dispatch])

	const onToggleBoardListShown = () => {
		isBoardListOpen ? toggleBoardList(false) : toggleBoardList(true)
	}

	const handleClick = (event) => {
		setAnchorEl(anchorEl ? null : event.currentTarget)
	}

	const open = Boolean(anchorEl)
	const id = open ? 'simple-popper' : undefined


	const onAddBoard = async () => {
		const newBoard = await utilService.createEmptyBoard()
		if (boards.length > 0) await dispatch(addBoard(newBoard))
		else onAddFirstBoard(newBoard)
		socketService.emit('update workspace')
	}

	const onAddFirstBoard = async (newBoard) => {
		const addedBoard = await dispatch(addBoard(newBoard))
		history.push(`/board/${addedBoard._id}/board`)

	}


	return (
		<section
			className={`boardlist-container ${isBoardListOpen ? 'open' : ''}`}>
			<span className="workspace-title">Workspace</span>
			<button
				className={`toggle-btn fa-solid ${isBoardListOpen ? 'angleleft' : 'angleright'
					} `}
				onClick={() => onToggleBoardListShown()}></button>
			<button
				className="workspace-toggle"
				aria-describedby={id}
				type="button"
				onClick={handleClick}>
				<h2>
					Main workspace{' '}
					<span className={`fa-solid ${open ? 'angleup' : 'angledown'} `}></span>
				</h2>
			</button>
			<div onClick={onAddBoard} className="add-board">
				<span className="fa-solid plus"></span>
				<span> Add</span>
			</div>
			<div className="filter-boards">
				<span className="fa-solid filter"></span>
				<span> Filter</span>
			</div>

			<div className="break-line"></div>

			<div className="boards-container">
				{boards.map((board) => {
					return (
						<BoardPreview
							key={board._id}
							board={board}
							currBoard={currBoard}
							boards={boards}
						/>
					)
				})}
			</div>
		</section>
	)
}

