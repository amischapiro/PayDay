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
    getTypeById,
    getGroupAndIdx,
    getStoryAndIdx
}



async function query(userId) {
    const boards = await httpService.get('board', { userId })
    return boards
}


async function getById(boardId) {
    try {
        const board = await httpService.get(`board/${boardId}`)
        return board
    } catch (error) {
        throw error
    }
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



async function getStatusById(boardId, statusId) {
    const board = await getById(boardId)
    return board.statuses.find(status => status.id === statusId)
}

async function getPriorityById(boardId, priorityId) {
    const board = await getById(boardId)
    return board.priorities.find(priority => priority.id === priorityId)
}

async function getTypeById(boardId, typeId) {
    const board = await getById(boardId)
    return board.types.find(type => type.id === typeId)
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

function getGroupAndIdx(board, groupId) {
    const groupIdx = board.groups.findIndex(group => group.id === groupId)
    const group = board.groups[groupIdx]
    return { groupIdx, group }
}

function getStoryAndIdx(board, groupIdx, storyId) {
    if (groupIdx === -1) return {}
    const storyIdx = board.groups[groupIdx].stories.findIndex(story => story.id === storyId)
    const story = board.groups[groupIdx].stories[storyIdx]
    return { story, storyIdx }
}
