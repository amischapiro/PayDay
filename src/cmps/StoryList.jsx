import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Story } from '../cmps/Story';

const StoryList = (props) => {
	const { group, groupNum, board } = props;
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
			<div className="add-story">
				<div
					className="story-selector"
					style={{
						backgroundColor: group.style.backgroundColor,
					}}></div>
				<h5>+ Add Story</h5>
			</div>
		</div>
	);
};

export default StoryList;
