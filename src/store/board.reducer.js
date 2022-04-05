

const initialState = {
    boards: [],
    selectedBoard: null,
    filterBy: null,
    activityModalStory: {
        boardId: null,
        groupId: null,
        storyId: null
    },
    isLoading: false
}

export function boardReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_BOARDS':
            newState = {
                ...state, boards:
                    [...action.boards],
                isLoading: false
            }
            break
        case 'SET_BOARD':
            return { ...state, selectedBoard: action.board, isLoading: false }
        case 'REMOVE_BOARD':
            newState = { ...state, boards: state.boards.filter(board => board._id !== action.boardId) }
            break
        case 'UPDATE_BOARD':
            newState = {
                ...state,
                selectedBoard: action.board,
                boards: state.boards.map(currBoard => {
                    return (currBoard._id === action.board._id) ? action.board : currBoard
                })
            }
            break
        case 'ADD_BOARD':
            newState = { ...state, boards: [...state.boards, action.board] }
            break
        case 'SET_FILTER':
            newState = { ...state, filterBy: action.filterBy }
            break;
        case 'SET_STORY':
            const { story: { boardId, groupId, storyId } } = action
            newState = { ...state, activityModalStory: { boardId, groupId, storyId } }
            break;
        case 'SET_LOADING':
            newState = { ...state, isLoading: true }
            break;
        default:
            return newState;
    }

    return newState;
}




        // if (sortBy === 'name') {
        //     state.boards.sort((t1, t2) => t1.name.localeCompare(t2.name));
        // } else {
        //     state.boards.sort((t1, t2) => t2[sortBy] - t1[sortBy]);
        // }
        // return newState = { ...state, boards: state.boards, sortBy }