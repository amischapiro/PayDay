import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StoryList from './StoryList';
export class GroupList extends Component {
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
						<div ref={provided.innerRef} className="groups-container">
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
												{group.title}
												<StoryList
													groupNum={index}
													group={group}
													board={this.props.board}
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
