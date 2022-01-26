// import { storageService } from './async-storage.service'
import { httpService } from './http.service'

export const boardService = {
    query,
    getById,
    remove,
    save,
    addBoard,
    getStatusById,
    getPriorityById,
    getMemberById,
    updateTimeline,
}



async function query() {
    const boards = await httpService.get('board')
    return boards
}


async function getById(boardId) {
    const board = await httpService.get(`board/${boardId}`)
    return board
}

async function remove(boardId) {
    await httpService.delete(`board/${boardId}`)
    return boardId
}

async function save(boardToUpdate) {
    const boardId = boardToUpdate._id
     await httpService.put(`board/${boardId}`, boardToUpdate)
    return boardToUpdate
}


async function addBoard(boardToAdd) {
    const newBoard = await httpService.post('board', boardToAdd)
    return newBoard
}


// ADD FIRST NEW BOARD IF EMPTY

// utilService.createFirstBoard()


async function sortBoard(boardId) {
    const board = await httpService.get(`board/${boardId}`)
    let sortedBoard = { ...board };
    let sortBy = board.sortBy;
    switch (sortBy.type) {
        case 'name':
            sortedBoard.groups = board.groups.map(group => {
                return group.stories.sort(function (a, b) {
                    if (a.title < b.title) return group.order;
                    else if (a.title > b.title) return (group.order * -1);
                    else return 0;
                });
            })
            break;
        case 'date':
            sortedBoard.groups = board.groups.map(group => {
                return group.stories.sort(function (a, b) {
                    if (a.createdAt < b.createdAt) return group.order;
                    else if (a.createdAt > b.createdAt) return (group.order * -1);
                    else return 0;
                });
            })
            break;
        default:
            break;
    }
    return sortedBoard;
}

async function getStatusById(boardId, statusId) {
    const board = await getById(boardId)
    return board.statuses.find(status => status.id === statusId)
}

async function getPriorityById(boardId, priorityId) {
    const board = await getById(boardId)
    return board.priorities.find(priority => priority.id === priorityId)
}

async function getMemberById(boardId, memberId) {
    const board = await getById(boardId);
    return board.members.find(member => member._id === memberId);
}

async function updateTimeline(timeline) {
    const timeStamp = timeline.map(date => {
        if (date) return date.getTime();
        return null;
    });
    return timeStamp;
}


