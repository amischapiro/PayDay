

const initialState = {
    activities: [],
    isOpen: false,
    isPerStory: false,
    hasMore: false,
    isLoading: false,
    selectedStoryIds: {
        groupId: null,
        storyId: null
    }
}

export function activityReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_ACTIVITIES':
            newState = {
                ...state,
                activities: [...state.activities, ...action.activities],
            }
            break
        case 'SET_HAS_MORE':
            if (state.activities.length === action.collectionLength) newState = { ...state, hasMore: false }
            else newState = { ...state, hasMore: true }
            break
        case 'RESET_ACTIVITIES':
            newState = {
                ...state,
                activities: [],
                hasMore: false
            }
            break
        case 'ADD_ACTIVITY':
            newState = {
                ...state,
                activities: [action.activity, ...state.activities],
            }
            break
        case 'REMOVE_ACTIVITIES':
            newState = { ...state, activities: [] }
            break
        case 'SET_IS_OPEN':
            newState = { ...state, isOpen: action.payload }
            break
        case 'SET_IS_PER_STORY':
            newState = { ...state, isPerStory: action.payload }
            break
        case 'SET_SELECTED_STORY_IDS':
            const { groupId, storyId } = action.payload
            newState = { ...state, selectedStoryIds: { groupId, storyId } }
            break
        case 'SET_IS_LOADING':
            newState = { ...state, isLoading: action.payload }
            break
        default:
            return newState;
    }

    return newState;
}

