import { storageService } from './async-storage.service'



export const boardService = {
    query,
    getById,
    remove,
    save,
    // addBoard,
    getStatusById,
    getPriorityById,
    getMemberById,
    updateTimeline,
}

const STORAGE_KEY = 'boardDB'

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

async function query() {
    let boards = await storageService.query(STORAGE_KEY)
    // console.log(boards);
    return boards
}


async function getById(boardId) {
    const board = await storageService.get(STORAGE_KEY, boardId)
    return board
}

async function remove(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
    return boardId
}


async function save(boardToUpdate) {
    const updatedBoard = await storageService.put(STORAGE_KEY, boardToUpdate)
    return boardToUpdate
}

// async function addBoard(boardToAdd) {
//     const newBoard = await storageService.post(STORAGE_KEY, boardToAdd)
//     return newBoard
// }

async function sortBoard(boardId) {
    const board = await storageService.get(STORAGE_KEY, boardId)
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



