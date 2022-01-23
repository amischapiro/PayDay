import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { Story } from '../cmps/Story';
import { AddStory } from './AddStory';
import { StoryMenuBtn } from './StoryMenuBtn';

import { useEffect, useState } from 'react';

function _StoryList(props) {
	const { group, groupNum, board, updateBoard } = props;

	return (
		<div className="group-container">
			<Droppable
				droppableId={group.id}
				type="story">
				{(provided, snapshot) => (
					<div ref={provided.innerRef}>
						{group.stories.map((story, index) => {
							return (
								<Draggable
									key={story.id}
									draggableId={story.id}
									index={index}
									type="story">
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}>
											<span {...provided.dragHandleProps}>
<<<<<<< HEAD
												<Story
													updateBoard={updateBoard}
													board={board}
													group={group}
													story={story}
												/>
=======
												<div className="story-main-wrapper">
													<StoryMenuBtn updateBoard={updateBoard} board={board}
														group={group} story={story} />

													<Story
														updateBoard={updateBoard}
														board={board}
														group={group}
														story={story}

													/>
												</div>
>>>>>>> bdeab29ef20f07d643a08b23f7f057bb9dfd66bf
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
			<AddStory group={group} board={board} updateBoard={updateBoard} />
		</div>
	);
}

function mapStateToProps({ boardModule }) {
	return {
		// selectedBoard: boardModule.board,
		// users: state.userModule.users,
		// loggedInUser: state.userModule.loggedInUser
	};
}

const mapDispatchToProps = {};

export const StoryList = connect(
	mapStateToProps,
	mapDispatchToProps
)(_StoryList);
