import { httpService } from './http.service'

export const activityService = {
    query,
    remove,
    add,
}



async function query(skip, boardId, storyId) {
    const activities = await httpService.get(`board/${boardId}/activity`, { storyId, skip })
    return activities
}

async function add(boardId, activity) {
    const insertedId = await httpService.post(`board/${boardId}/activity`, { activity })
    return insertedId
}

async function remove(boardId) {
    await httpService.delete(`board/${boardId}`)
    return boardId
}








