

const initialState = {
    boards: [],
    selectedBoard: null,
    activityModalStory: {
        boardId: null,
        groupId: null,
        storyId: null
    },
}

export function boardReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_BOARDS':
            // console.log('board.reducer.js 💤 26: ', action.boards);
            newState = { ...state, boards: [...action.boards] }
            break
        case 'SET_BOARD':
            return { ...state, selectedBoard: action.filteredBoard }
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
            newState = { ...state, filterBy: { ...action.filterBy } }
            break
        case 'SET_SORT':
            if (action.sortBy === 'name') {
                newState = { ...state, sortBy: { name: -1 } }
            } else if (action.sortBy === 'price') {
                newState = { ...state, sortBy: { price: 1 } }
            }
            if (action.sortBy === 'name' && state.sortBy && state.sortBy.order === -1) {
                newState = { ...state, sortBy: { name: 1 } }
            } else if (action.sortBy === 'price' && state.sortBy && state.sortBy.price === -1) {
                newState = { ...state, sortBy: { price: 1 } }
            }
            break;
        case 'SET_STORY':
            newState = {...state, activityModalStory: { boardId: action.story.boardId, groupId: action.story.groupId, storyId: action.story.storyId } }
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