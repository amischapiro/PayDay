import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { StoryList } from './StoryList';
import { DynamicColHeaders } from './DynamicColHeaders';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import UnfoldLessRoundedIcon from '@mui/icons-material/UnfoldLessRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
export class _GroupList extends Component {
	// state = {
	// 	board: this.props.board
	// }

	// a little function to help us with reordering the result
	Reorder = (list, startIndex, endIndex) => {
		const result = Array.from(list);
		const [removed] = result.splice(startIndex, 1);
		result.splice(endIndex, 0, removed);

		return result;
	};

	constructor(props) {
		super(props);
		const { groups } = this.props.board;
		this.state = {
			groups,
		};
		this.onDragEnd = this.onDragEnd.bind(this);
	}

	onDragEnd(result) {
		if (!result.destination) return;
		if (result.type === 'GROUPS') {
			const groups = this.Reorder(
				this.state.groups,
				result.source.index,
				result.destination.index
			);
			this.setState({ groups });
		} else {
			const stories = this.Reorder(
				this.state.groups[parseInt(result.type, 10)].stories,
				result.source.index,
				result.destination.index
			);

			const groups = JSON.parse(JSON.stringify(this.state.groups));
			groups[result.type].stories = stories;

			this.setState({ groups });
		}
	}

	render() {
		return (
			<DragDropContext
				onDragEnd={this.onDragEnd}
				onDragUpdate={this.onDragUpdate}>
				<Droppable droppableId="droppable" type="GROUPS">
					{(provided, snapshot) => (
						<div
							ref={provided.innerRef}
							className="groups-container">
							{this.state.groups.map((group, index) => (
								<Draggable
									key={group.id}
									draggableId={group.id}
									index={index}>
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
														{this.props.selectedBoard.cmpsOrder.map(
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
													board={
														this.props.selectedBoard
													}
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
		boards: boardModule.boards,
		selectedBoard: boardModule.selectedBoard,
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
