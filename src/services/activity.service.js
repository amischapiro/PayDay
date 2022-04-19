
import { httpService } from './http.service'

export const activityService = {
    query,
    remove,
    add,
    makeNewActivity,
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



function makeNewActivity(type, user, board, group, story) {
    const newActivity = {
        type,
        createdAt: Date.now(),
        byMember: user,
        board: {
            _id: board._id,
            title: board.title
        },
        group: {
            id: group.id,
            title: group.title
        }
    }
    if (story) newActivity.story = {
        id: story.id,
        title: story.title
    }
    return newActivity
}







