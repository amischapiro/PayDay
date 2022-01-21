import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Story } from '../cmps/Story';
// import { getItemStyle, getAnswerListStyle } from "./utils";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// function _StoryList(props) {
//     const { question, questionNum } = props;
//     const { board, group } = props
//     const {stories} = group
//     // console.log('StoryList.jsx ❕ 55: ', board, group);

//     return (
//         <Droppable droppableId={`droppable${group.id}`} type={`${group.stories[0]}`}>
//             {(provided, snapshot) => (
//                 <div
//                     ref={provided.innerRef}
//                 //   style={getAnswerListStyle(snapshot.isDraggingOver)}
//                 >
//                     {group.stories.map((story, index) => {
//                         return (
//                             <Draggable
//                                 key={`${story.id}${index}`}
//                                 draggableId={`${story.id}${index}`}
//                                 index={index}
//                             >
//                                 {(provided, snapshot) => (
//                                     <div
//                                         ref={provided.innerRef}
//                                         {...provided.draggableProps}

//                                     // style={getItemStyle(
//                                     //   snapshot.isDragging,
//                                     //   provided.draggableProps.style
//                                     // )}
//                                     >
//                                         <span className="fa-solid grip" {...provided.dragHandleProps}>

//                                         </span>
//                                         {stories.map(story => {
//                                             return <Story key={story.id} story={story} board={board} />
//                                         })}
//                                     </div>
//                                 )}
//                             </Draggable>
//                         );
//                     })}
//                     {provided.placeholder}
//                 </div>
//             )}
//         </Droppable>
//     );
// };

// function mapStateToProps(state) {
//     return {
//         // board: state.boardModule.board,
//         // users: state.userModule.users,
//         // loggedInUser: state.userModule.loggedInUser
//     }
// }

// const mapDispatchToProps = {

// }

// export const StoryList = connect(mapStateToProps, mapDispatchToProps)(_StoryList)

const StoryList = (props) => {
	const { group, groupNum, board } = props;
	return (
		<Droppable droppableId={`droppable${group.id}`} type={`${groupNum}`}>
			{(provided, snapshot) => (
				<div
					ref={provided.innerRef}>
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
	);
};

export default StoryList;
