import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

export class DynamicColHeaders extends Component {
	// onUpdateGroupTitle = async ({ target }) => {
	//     let value = target.innerText;
	//     if (!value) value = 'New group';
	//     const newBoard = { ...this.props.board };
	//     const groupId = this.props.group.id;
	//     const groupIdx = newBoard.groups.findIndex(group => group.id === groupId);
	//     const newActivity = {
	//         id: utilService.makeId(),
	//         type: 'Group title changed',
	//         createdAt: Date.now(),
	//         byMember: userService.getLoggedinUser(),
	//         task: null,
	//         group: {
	//             id: groupId,
	//             title: value
	//         }
	//     }
	//     newBoard.groups[groupIdx].title = value;
	//     newBoard.activities.unshift(newActivity)
	//     await this.props.updateBoard(newBoard);
	//     socketService.emit('board updated', newBoard._id);
	// }

	// let data = {};

	// switch(cmp) {
	//     case 'member-picker':
	//         data = {name: 'People', width: "97px", bgColor: "inherit"};
	//         break;
	//     case 'status-picker':
	//         data = {name: 'Status', width: "117px", bgColor: "#f5f6f8"};
	//         break;
	//     case 'priority-picker':
	//         data = {name: 'Priority', width: "92px", bgColor: "inherit"};
	//         break;
	//     case 'timeline-picker':
	//         data = {name: 'Timeline', width: "180px", bgColor: "inherit"};
	//         break;
	//     case 'number-picker':
	//         data = {name: 'Estimated SP', width: "125px", bgColor: "inherit"};
	//         break;
	//     case 'link-picker':
	//         data = {name: 'Link to Design', width: "140px", bgColor: "inherit"};
	//         break;
	//     default:
	//         break;
	// }

	// { id } = this.props.group;

	// let data = {};

	DynamicGroupHeader = ({cmp, index, id}) => {
        // console.log('DynamicColHeaders.jsx 💤 59: ', cmp);
		switch (cmp) {
			case 'title':
				return <span></span>;
			case 'member-picker':
				return (
					<Draggable
						draggableId={`member-picker_${id}`}
						index={index}
						type="column"
						key={`member-picker_${id}`}>
						{(provided, snapshot) => (
							<div
								className={
									snapshot.isDragging
										? 'cell members isDragging'
										: 'cell members'
								}
								{...provided.draggableProps}
								ref={provided.innerRef}
								>
								<span
									className="left-border"
									{...provided.dragHandleProps}>
									<DragIndicatorIcon className="col-dragger" />
								</span>
								<span>People</span>
								<span className="right-border"></span>
							</div>
						)}
					</Draggable>
				);
			case 'status-picker':
				return (
					<Draggable
						draggableId={`status-picker_${id}`}
						index={index}
						type="column"
						key={`status-picker_${id}`}>
						{(provided, snapshot) => (
							<div
								className={
									snapshot.isDragging
										? 'cell status isDragging'
										: 'cell status'
								}
								{...provided.draggableProps}
								ref={provided.innerRef}
								>
								<span
									className="left-border"
									{...provided.dragHandleProps}>
									<DragIndicatorIcon className="col-dragger" />
								</span>
								<span>Status</span>
								<span className="right-border"></span>
							</div>
						)}
					</Draggable>
				);
			case 'priority-picker':
				return (
					<Draggable
						draggableId={`priority-picker_${id}`}
						index={index}
						type="column"
						key={`priority-picker_${id}`}>
						{(provided, snapshot) => (
							<div
								className={
									snapshot.isDragging
										? 'cell priority isDragging'
										: 'cell priority'
								}
								{...provided.draggableProps}
								ref={provided.innerRef}
								>
								<span
									className="left-border"
									{...provided.dragHandleProps}>
									<DragIndicatorIcon className="col-dragger" />
								</span>
								<span>Priority</span>
								<span className="right-border"></span>
							</div>
						)}
					</Draggable>
				);
			case 'timeline-picker':
				return (
					<Draggable
						draggableId={`timeline-picker_${id}`}
						index={index}
						type="column"
						key={`timeline-picker_${id}`}>
						{(provided, snapshot) => (
							<div
								className={
									snapshot.isDragging
										? 'cell timeline isDragging'
										: 'cell timeline'
								}
								{...provided.draggableProps}
								ref={provided.innerRef}
								>
								<span
									className="left-border"
									{...provided.dragHandleProps}>
									<DragIndicatorIcon className="col-dragger" />
								</span>
								<span>Timeline</span>
								<span className="right-border"></span>
							</div>
						)}
					</Draggable>
				);
			case 'number-picker':
				return (
					<Draggable
						draggableId={`number-picker_${id}`}
						index={index}
						type="column"
						key={`number-picker_${id}`}>
						{(provided, snapshot) => (
							<div
								className={
									snapshot.isDragging
										? 'cell number isDragging'
										: 'cell number'
								}
								{...provided.draggableProps}
								ref={provided.innerRef}>
								<span
									className="left-border"
									{...provided.dragHandleProps}>
									<DragIndicatorIcon className="col-dragger" />
								</span>
								<span>Estimated SP</span>
								<span className="right-border"></span>
							</div>
						)}
					</Draggable>
				);
			case 'link-picker':
				return (
					<Draggable
						draggableId={`link-picker_${id}`}
						index={index}
						type="column"
						key={`link-picker_${id}`}>
						{(provided, snapshot) => (
							<div
								className={
									snapshot.isDragging
										? 'cell link isDragging'
										: 'cell link'
								}
								ref={provided.innerRef}
								{...provided.draggableProps}
								>
								<span
									className="left-border"
									{...provided.dragHandleProps}>
									<DragIndicatorIcon className="col-dragger" />
								</span>
								<span>Link to Design</span>
								<span className="right-border"></span>
							</div>
						)}
					</Draggable>
				);
			default:
				return <div></div>;
		}
	};

    render() {
        const {group, board} = this.props
	return (
		// <div className="dynamic-cmp" style={{width: data.width, backgroundColor: data.bgColor}}>{data.name}</div>
		<Droppable
			droppableId={`column-${group.id}`}
			type="column"
			direction="horizontal">
			{(provided, snapshot) => (
				<div
					className={
						snapshot.isDraggingOver
							? 'column-dnd-container isDragging'
							: 'column-dnd-container'
					}
					ref={provided.innerRef}>
					{board.cmpsOrder.map((cmp, index) => {
						return <this.DynamicGroupHeader key={index} cmp={cmp} index={index} id={group.id} />
					})}
                    {provided.placeholder}
				</div>
			)}
		</Droppable>
	);
}}
