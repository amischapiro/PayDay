// import { connect } from 'react-redux'
// import { StoryList } from '../cmps/StoryList.jsx'

// function _GroupList(props) {
//     const { board } = props
//     const { groups } = board

//     return (
//         <section className="group-list">
//             {groups.map(group => {
//                 return <StoryList key={group.id} board={board}
//                     group={group} />
//             })}

//         </section>
//     )
// }

// function mapStateToProps(state) {
//     return {
//         // board: state.boardModule.board,
//         // filterBy: state.boardModule.filterBy,
//         // users: state.userModule.users,
//         // loggedInUser: state.userModule.loggedInUser
//     }
// }

// const mapDispatchToProps = {

// }

// export const GroupList = connect(mapStateToProps, mapDispatchToProps)(_GroupList)

// note p.1 starts here

// import React, { Component } from 'react';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { StoryList } from '../cmps/StoryList.jsx';

// note in note
//   const getQuestions = groups.map((group,idx)=>{
//       return {
//           id:group.id,
//           content: group.title,
//           answers: group.stories
//       }
//   })

// note p.2 starts here

// const Reorder = (list, startIndex, endIndex) => {
// 	const result = Array.from(list);
// 	const [removed] = result.splice(startIndex, 1);
// 	result.splice(endIndex, 0, removed);

// 	return result;
// };

// export class GroupList extends Component {
// 	constructor(props) {
// 		super(props);

// 		const { board } = this.props;
// 		const { groups } = board;

// 		const getGroups = () => {
// 			const newGroups = groups.map((group, idx) => {
// 				// console.log('group from questions:', group);

// 				return group;
// 				// id: group.id,
// 				// content: group.title,
// 				// answers: group.stories
// 			});
// 			return newGroups;
// 		};
// 		this.state = {
// 			groups: getGroups(),
// 		};
// 		this.onDragEnd = this.onDragEnd.bind(this);

// 		// const getQuestions = count =>
// 		//     Array.from({ length: count }, (v, k) => k).map(k => ({
// 		//         id: `question-${k}`,
// 		//         content: `question ${k}`,
// 		//         answers: [`answer-1`, `answer-2`]
// 		//     }));

// 		// this.state = {
// 		//     questions: getQuestions(2)
// 		// };
// 		// this.onDragEnd = this.onDragEnd.bind(this);
// 	}

// 	onDragEnd(result) {
// 		// dropped outside the list
// 		if (!result.destination) {
// 			//console.log("no-change");
// 			return;
// 		}

// 		if (result.type === 'GROUPS') {
// 			const groups = Reorder(
// 				this.state.groups,
// 				result.source.index,
// 				result.destination.index
// 			);

// 			this.setState({
// 				groups,
// 			});
// 		} else {
// 			const story = Reorder(
// 				this.state.groups[parseInt(result.type, 10)].story,
// 				result.source.index,
// 				result.destination.index
// 			);

// 			const groups = JSON.parse(JSON.stringify(this.state.groups));

// 			groups[result.type].story = story;

// 			this.setState({
// 				groups,
// 			});
// 		}
// 	}

// 	render() {
// 		const { board } = this.props;
// 		const { groups } = board;

// 		return (
// 			<DragDropContext
// 				onDragEnd={this.onDragEnd}
// 				onDragUpdate={this.onDragUpdate}>
// 				<Droppable droppableId="droppable" type="GROUPS">
// 					{(provided, snapshot) => (
// 						<div ref={provided.innerRef}>
// 							{this.state.groups.map((group, index) => (
// 								<Draggable
// 									key={group.id}
// 									draggableId={group.id}
// 									index={index}>
// 									{(provided, snapshot) => (
// 										<div
// 											ref={provided.innerRef}
// 											{...provided.draggableProps}>
// 											<span
// 												className="fa-solid grip"
// 												{...provided.dragHandleProps}></span>
// 											{groups.map((group) => {
// 												return (
// 													<StoryList
// 														key={group.id}
// 														board={board}
// 														group={group}
// 													/>
// 												);
// 											})}
// 										</div>
// 									)}
// 								</Draggable>
// 							))}
// 							{provided.placeholder}
// 						</div>
// 					)}
// 				</Droppable>
// 			</DragDropContext>
// 		);
// 	}
// }

// export default Questions;

// playground
import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Reorder, getItemStyle, getGroupListStyle } from './utils';
import StoryList from './StoryList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
export class GroupList extends Component {
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
			console.log('result:', result);
			const groups = Reorder(
				this.state.groups,
				result.source.index,
				result.destination.index
			);
			this.setState({ groups });
		} else {
			const stories = Reorder(
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
						<div ref={provided.innerRef}>
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
