import { Droppable, Draggable } from 'react-beautiful-dnd';
import { KanbanStory } from './KanbanStory';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export function KanbanGroup({
	drag,
	group,
	board,
	updateBoard,
	filterBy,
	updateWhileFilter,
}) {
	return (
		<div className="kanban-group" style={{backgroundColor: group.style.backgroundColor}}>
			<div className="kanban-group-header">
				<span {...drag} className="kanban-group-dragger">
					<DragIndicatorIcon />
				</span>
				<h5 className="kanban-group-title">{group.title}</h5>
			</div>
			<Droppable droppableId={group.id} type="story" direction="vertical">
				{(provided) => (
					<div ref={provided.innerRef}>
						{group.stories.length ? (
							group.stories.map((story, index) => {
								return (
									<Draggable
										key={story.id}
										draggableId={story.id}
										index={index}
										type="story">
										{(provided) => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}>
												<span
													{...provided.dragHandleProps}>
													<KanbanStory
														updateBoard={
															updateBoard
														}
														board={board}
														group={group}
														story={story}
														filterBy={filterBy}
														updateWhileFilter={
															updateWhileFilter
														}
													/>
												</span>
											</div>
										)}
									</Draggable>
								);
							})
						) : (
							<Draggable
								key="fragment-placeholder"
								draggableId="fragment-placeholder"
								index={17}
								type="story">
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										className="kanban-placement-empty-group">
										<span
											{...provided.dragHandleProps}></span>
									</div>
								)}
							</Draggable>
						)}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</div>
	);
}
