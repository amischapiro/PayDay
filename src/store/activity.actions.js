import { activityService } from "../services/activity.service"

export function loadActivities(storyId) {
    return async (dispatch, getState) => {
        const boardId = getState().boardModule.selectedBoard._id
        const skip = getState().activityModule.activities.length
        try {
            const activities = await activityService.query(skip, boardId, storyId)
            dispatch({ type: 'SET_ACTIVITIES', activities })
            return activities
        } catch (error) {
            console.log('Cannot get Boards', error);
        }
    }
}

export function fetchLastActivity() {
    return async (dispatch, getState) => {
        const boardId = getState().boardModule.selectedBoard._id
        try {
            const activities = await activityService.query(0, boardId)
            dispatch({ type: 'ADD_ACTIVITY', activity: activities[0] })
        } catch (error) {
            console.log('Cannot get Boards', error);
        }
    }
}

export function addActivity(activity) {
    return async (dispatch, getState) => {
        const boardId = getState().boardModule.selectedBoard._id
        try {
            const { insertedId } = await activityService.add(boardId, activity)
            activity._id = insertedId
            dispatch({ type: 'ADD_ACTIVITY', activity })
        } catch (err) {
            console.log('Cannot add activity', err);
        }
    }
}

