import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux'
import { Story } from '../cmps/Story';
import { AddStory } from './AddStory';

import { useState } from 'react';
import { updateBoard } from '../store/board.action'

function _StoryList(props) {
	const { group, groupNum, board } = props;
	const [newBoard, setNewBoard] = useState({ ...board })

	const onUpdateBoard = (boardToUpdate) => {
		setNewBoard({ ...newBoard, boardToUpdate });
		updateBoard(newBoard);
	}

	return (
		<div className="group-container">
			<Droppable
				droppableId={`droppable${group.id}`}
				type={`${groupNum}`}>
				{(provided, snapshot) => (
					<div ref={provided.innerRef}>
						{group.stories.map((story, index) => {
							return (
								<Draggable
									key={`${groupNum}${index}`}
									draggableId={`${groupNum}${index}`}
									index={index}>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}>
											<span {...provided.dragHandleProps}>
												<Story
													onUpdateBoard={onUpdateBoard}
													board={board}
													group={group}
													story={story}
												/>
											</span>
										</div>
									)}
								</Draggable>
							);
						})}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<AddStory group={group} board={board} onUpdateBoard={onUpdateBoard} />
		</div>
	);
};

function mapStateToProps({ boardModule }) {
	return {
		// selectedBoard: boardModule.board,
		// users: state.userModule.users,
		// loggedInUser: state.userModule.loggedInUser
	}
}

const mapDispatchToProps = {
	updateBoard,
}


export const StoryList = connect(mapStateToProps, mapDispatchToProps)(_StoryList)