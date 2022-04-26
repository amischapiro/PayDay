import React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import DragIndicatorIcon from '@mui/icons-material/DragIndicator'
import UnfoldLessRoundedIcon from '@mui/icons-material/UnfoldLessRounded'

import { StoryList } from './StoryList'
import { DynamicColHeaders } from './DynamicColHeaders'
import { GroupMenu } from './menus/GroupMenu'
import { GroupTitle } from './GroupTitle'
import { ColumnMenu } from './menus/ColumnMenu'

export const GroupList = ({ board, updateBoard, filterBy, updateWhileFilterSort, onSetCol }) => {

	const onDragEnd = async (result) => {

		if (filterBy) {
			updateWhileFilterSort()
			return
		} else if (board.sortBy.name) {
			updateWhileFilterSort()
			return
		}
		const { destination, source, draggableId, type } = result
		if (!destination) return
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return
		if (type === 'story') {
			const sourceGroup = board.groups.find(
				(group) => group.id === source.droppableId
			)
			const destinationGroup = board.groups.find(
				(group) => group.id === destination.droppableId
			)
			const story = sourceGroup.stories.find(
				(story) => story.id === draggableId
			)
			sourceGroup.stories.splice(source.index, 1)
			destinationGroup.stories.splice(destination.index, 0, story)
		}
		if (type === 'group') {
			const sourceGroup = board.groups.find(
				(group) => group.id === draggableId
			)
			board.groups.splice(source.index, 1)
			board.groups.splice(destination.index, 0, sourceGroup)
		}
		if (type === 'column') {
			const idx = draggableId.indexOf('_')
			const cmp = draggableId.slice(0, idx)
			board.cmpsOrder.splice(source.index, 1)
			board.cmpsOrder.splice(destination.index, 0, cmp)
		}
		const newBoard = { ...board }
		updateBoard(newBoard)
	}


	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="all-groups" type="group">
				{provided => (
					<div
						ref={provided.innerRef}
						className="groups-container"
						key={board._id}>
						{board.groups.map((group, index) => (
							<Draggable
								key={group.id}
								draggableId={group.id}
								index={index}
								type="group">
								{provided => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}>
										<div className="group-header">
											<div className="header-info-container">
												<div className="group-name-container">
													<GroupMenu board={board} group={group} updateBoard={updateBoard}
														groupColor={group.style.backgroundColor} />

													<UnfoldLessRoundedIcon className="collapse-group" />
													<span {...provided.dragHandleProps}>
														<DragIndicatorIcon className="drag-group" />
													</span>
													<GroupTitle board={board} group={group}
														updateBoard={updateBoard} />
												</div>
												<DynamicColHeaders
													board={board}
													group={group}
												/>
											</div>
											<ColumnMenu onSetCol={onSetCol} />
										</div>
										<StoryList
											groupNum={index}
											group={group}
											board={board}
											updateBoard={updateBoard}
											filterBy={filterBy}
											updateWhileFilterSort={updateWhileFilterSort}
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	)
}

