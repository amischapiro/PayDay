import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { Story } from '../cmps/Story';
import { AddStory } from './AddStory';
import { GroupSum } from './GroupSums';
import { StoryMenu } from './menus/StoryMenu';


function _StoryList(props) {
	const { group, groupNum, board, updateBoard } = props;

	// const [isTitleEditOn, toggleTitleEdit] = useState(false)
	// const [titleInput, setTitleInput] = useState(group.title)

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
												<div className="story-main-wrapper">
													<StoryMenu updateBoard={updateBoard} board={board}
														group={group} story={story} />

													<Story
														updateBoard={updateBoard}
														board={board}
														group={group}
														story={story}

													/>
												</div>
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
			<GroupSum group={group} cmpsOrder={board.cmpsOrder} />
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
