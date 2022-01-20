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







import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import { getItemStyle, getQuestionListStyle } from "./utils";
// import Answers from "./answer";
import { StoryList } from '../cmps/StoryList.jsx'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// fake data generator


//   const getQuestions = groups.map((group,idx)=>{
//       return {
//           id:group.id,
//           content: group.title,
//           answers: group.stories
//       }
//   })

const Reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

export class GroupList extends Component {
    constructor(props) {
        super(props);
        // console.log('this.props:', this.props);

        const { board } = this.props
        const { groups } = board

        // const getQuestions = () => {
        //     groups.map((group, idx) => {
        //         return {
        //             id: group.id,
        //             content: group.title,
        //             answers: group.stories
        //         }
        //     })
        // }

        const getQuestions = count =>
            Array.from({ length: count }, (v, k) => k).map(k => ({
                id: `question-${k}`,
                content: `question ${k}`,
                answers: [`answer-1`, `answer-2`]
            }));

        // console.log(getQuestions(3));

        this.state = {
            questions: getQuestions(2)
        };
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    onDragEnd(result) {
        // dropped outside the list
        if (!result.destination) {
            //console.log("no-change");
            return;
        }

        if (result.type === "QUESTIONS") {
            const questions = Reorder(
                this.state.questions,
                result.source.index,
                result.destination.index
            );

            this.setState({
                questions
            });
        } else {
            const answers = Reorder(
                this.state.questions[parseInt(result.type, 10)].answers,
                result.source.index,
                result.destination.index
            );

            const questions = JSON.parse(JSON.stringify(this.state.questions));

            questions[result.type].answers = answers;

            this.setState({
                questions
            });
        }
    }

    // Normally you would want to split things out into separate components.
    // But in this example everything is just done in one place for simplicity
    render() {
        const { board } = this.props
        const { groups } = board
        

        return (
            <DragDropContext
                onDragEnd={this.onDragEnd}
                onDragUpdate={this.onDragUpdate}
            >
                <Droppable droppableId="droppable" type="QUESTIONS">
                    {(provided, snapshot) => (
                        <div
                            ref={provided.innerRef}
                        // style={getQuestionListStyle(snapshot.isDraggingOver)}
                        >
                            {this.state.questions.map((question, index) => (
                                <Draggable
                                    key={question.id}
                                    draggableId={question.id}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                        // style={getItemStyle(
                                        //     snapshot.isDragging,
                                        //     provided.draggableProps.style
                                        // )}
                                        >
                                            <span className="fa-solid grip" {...provided.dragHandleProps}>
                                            </span>
                                            {/* <StoryList key={groups[0].id} board={board} group={groups[0]} /> */}
                                            {groups.map(group => {
                                                console.log('group:', group);
                                                
                                                return <StoryList key={group.id} board={board}
                                                    group={group} />
                                            })}
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

// export default Questions;
