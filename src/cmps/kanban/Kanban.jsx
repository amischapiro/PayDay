

export function Kanban({ board, filterBy, updateBoard, updateWhileFilter }){

    const onDragEnd = async (result) => {
		if(filterBy.name || filterBy.status || filterBy.priority || filterBy.members) {
			updateWhileFilter();
			return;
		}
		const { destination, source, draggableId, type } = result;
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;
		if (type === 'story') {
			const sourceGroup = board.groups.find(
				(group) => group.id === source.droppableId
			);
			const destinationGroup = board.groups.find(
				(group) => group.id === destination.droppableId
			);
			const story = sourceGroup.stories.find(
				(story) => story.id === draggableId
			);
			sourceGroup.stories.splice(source.index, 1);
			destinationGroup.stories.splice(destination.index, 0, story);
		}
		if (type === 'group') {
			const sourceGroup = board.groups.find(
				(group) => group.id === draggableId
			);
			board.groups.splice(source.index, 1);
			board.groups.splice(destination.index, 0, sourceGroup);
		}

		const newBoard = { ...board };
		updateBoard(newBoard);
	};

    return <h1>Kanban</h1>
}