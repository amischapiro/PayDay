import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { StoryList } from './StoryList';
import { DynamicColHeaders } from './DynamicColHeaders';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import UnfoldLessRoundedIcon from '@mui/icons-material/UnfoldLessRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

export class _GroupList extends Component {

	onDragEnd = async (result) => {
		const { board } = this.props;
		const { destination, source, draggableId, type } = result;
		// const { currBoard } = this.props;
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;
		if (type === 'story') {
			const sourceGroup = board.groups.find(
				(group) => group.id === source.droppableId
			);
			const destinationGroup = board.groups.find(
				(group) => group.id === destination.droppableId
			);
			const story = sourceGroup.stories.find(
				(story) => story.id === draggableId
			);
			sourceGroup.stories.splice(source.index, 1);
			destinationGroup.stories.splice(destination.index, 0, story);
		}
		if (type === 'group') {
			const sourceGroup = board.groups.find(
				(group) => group.id === draggableId
			);
			board.groups.splice(source.index, 1);
			board.groups.splice(destination.index, 0, sourceGroup);
		}
		// if (type === 'column') {
		//     const idx = draggableId.indexOf('-')
		//     const cellType = draggableId.slice(0, idx)
		//     board.cellTypes.splice(source.index, 1);
		//     board.cellTypes.splice(destination.index, 0, cellType)
		// }
		const newBoard = { ...board };
		this.props.updateBoard(newBoard);
		// socketService.emit('board updated', newBoard._id);
	};

	render() {

		const { board, updateBoard } = this.props
		return (
			<DragDropContext
				onDragEnd={this.onDragEnd}
				// onDragUpdate={this.onDragUpdate}
				>
				<Droppable droppableId="all-groups" type="group">
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							className="groups-container">
							{board.groups.map((group, index) => (
								<Draggable
									key={group.id}
									draggableId={group.id}
									index={index}
									type="group">
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}>
											<span {...provided.dragHandleProps}>
												<div className="group-header">
													<div className="header-info-container">
														<div className="group-name-container">
															<UnfoldLessRoundedIcon className="collapse-group" />
															<DragIndicatorIcon className="drag-group" />
															<div
																style={{
																	color: group
																		.style
																		.backgroundColor,
																}}>
																{group.title}
															</div>
														</div>
														{board.cmpsOrder.map(
															(cmp, idx) => {
																return (
																	<DynamicColHeaders
																		key={
																			idx
																		}
																		cmp={
																			cmp
																		}
																	/>
																);
															}
														)}
													</div>
													<div className="header-add-col">
														<AddCircleOutlineRoundedIcon className="add-col-but" />
													</div>
												</div>
												<StoryList
													groupNum={index}
													group={group}
													board={board}
													updateBoard={updateBoard}
												/>
											</span>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		);
	}
}

function mapStateToProps({ boardModule }) {
	return {
		// boards: boardModule.boards,
		// selectedBoard: boardModule.selectedBoard
	};
}

const mapDispatchToProps = {
	// loadBoards,
	// getById
};

export const GroupList = connect(
	mapStateToProps,
	mapDispatchToProps
)(_GroupList);
