import { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { BoardHeader } from '../cmps/BoardHeader'
import { BoardActions } from '../cmps/BoardActions'
import { GroupList } from '../cmps/GroupList'

import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import { loadBoards, } from '../store/board.action'


export function _BoardArea(props) {
    // const { board } = props

    // useEffect(() => {
    //     // console.log(board);
    // }, [])

    // async function onDragEnd(result){
    //     const { destination, source, draggableId, type } = result;
    //     const { board } = this.props;
    //     if (!destination) return;
    //     if (
    //         destination.droppableId === source.droppableId &&
    //         destination.index === source.index
    //     ) return;
    //     if (type === 'story') {
    //         const sourceGroup = board.groups.find(group => group.id === source.droppableId);
    //         const destinationGroup = board.groups.find(group => group.id === destination.droppableId);
    //         const story = sourceGroup.stories.find(story => story.id === draggableId);
    //         sourceGroup.stories.splice(source.index, 1);
    //         destinationGroup.stories.splice(destination.index, 0, story);
    //     }
    //     if (type === 'group') {
    //         const sourceGroup = board.groups.find(group => group.id === draggableId);
    //         board.groups.splice(source.index, 1);
    //         board.groups.splice(destination.index, 0, sourceGroup);
        }
        // if (type === 'column') {
        //     const idx = draggableId.indexOf('-')
        //     const cellType = draggableId.slice(0, idx)
        //     board.cellTypes.splice(source.index, 1);
        //     board.cellTypes.splice(destination.index, 0, cellType)
        // }
        // const newBoard = { ...board };
        // await this.props.updateBoard(newBoard);
        // socketService.emit('board updated', newBoard._id);
    }




    return (
        <section className='board-area'>
            {/* <BoardHeader board={board} />
            <BoardActions board={board} />

            <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="all-groups" type="group">
                                {provided => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps} >
                                        {<GroupList
                                            board={board}
                                            groups={board.groups}
                                            key={board._id}
                                             />}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>


            <GroupList board={board} /> */}
            <div className='container'>
                <BoardHeader board={board} />
                <BoardActions board={board} />
                <GroupList board={board} />
            </div>
        </section>
    )
}


function mapStateToProps({ boardModule }) {
    return {
        boards: boardModule.boards
    }
}

const mapDispatchToProps = {
    loadBoards
}

export const BoardArea = connect(mapStateToProps, mapDispatchToProps)(_BoardArea)