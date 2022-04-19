import { Droppable, Draggable } from 'react-beautiful-dnd'
import React from 'react'
import { Story } from '../cmps/Story'
import { AddStory } from './AddStory'
import { GroupSum } from './GroupSums'
import { StoryMenu } from './menus/StoryMenu'

export function StoryList({ group, board, updateBoard, filterBy, updateWhileFilterSort }) {


	return (
		<div className="group-container">
			<Droppable droppableId={group.id} type="story">
				{provided => (
					<div ref={provided.innerRef}>
						{group.stories.length ? (
							group.stories.map((story, index) => {
								return (
									<Draggable
										key={story.id}
										draggableId={story.id}
										index={index}
										type="story">
										{provided => (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}>
												<span
													{...provided.dragHandleProps}>
													<div className="story-main-wrapper">
														<StoryMenu
															updateBoard={updateBoard}
															board={board}
															group={group}
															story={story}
														/>
														<Story
															updateBoard={updateBoard}
															board={board}
															group={group}
															story={story}
															filterBy={filterBy}
															updateWhileFilterSort={updateWhileFilterSort}
														/>
													</div>
												</span>
											</div>
										)}
									</Draggable>
								)
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
										className="placement-empty-group">
										<span
											{...provided.dragHandleProps}>
										</span>
									</div>
								)}
							</Draggable>
						)}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
			<AddStory group={group} board={board} updateBoard={updateBoard} />
			<GroupSum group={group} cmpsOrder={board.cmpsOrder} />
		</div>
	)
}

