

const initialState = {
    activities: [],
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
        case 'RESET_ACTIVITIES':
            newState = {
                ...state,
                activities: [],
            }
            break
        case 'SET_SKIP':
            newState = { ...state, skip: action.skip }
            break
        case 'ADD_ACTIVITY':
            newState = {
                ...state,
                activities: [action.activity, ...state.activities],
            }
            break
        default:
            return newState;
    }

    return newState;
}

