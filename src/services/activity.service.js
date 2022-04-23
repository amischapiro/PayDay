
import { httpService } from './http.service'
import { userService } from './user.service';

export const activityService = {
    query,
    remove,
    add,
    makeNewActivity,
}



async function query(skip, boardId, storyId) {
    const { activities, collectionLength } = await httpService.get(`board/${boardId}/activity`, { storyId, skip })
    return { activities, collectionLength }
}

async function add(boardId, activity) {
    const insertedId = await httpService.post(`board/${boardId}/activity`, { activity })
    return insertedId
}

async function remove(boardId) {
    await httpService.delete(`board/${boardId}/activity`)
}



function makeNewActivity(type, _, board, group, story) {
    const newActivity = {
        type,
        createdAt: Date.now(),
        byMember: userService.getMiniLoggedInUser(),
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







