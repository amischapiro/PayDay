

const initialState = {
    boards: [],
    selectedBoard: null,
    filterBy: null,
    isLoadingBoard: true,
    isLoadingBoards: true,
    hasAppLoaded: false
}

export function boardReducer(state = initialState, action) {

    let newState = state;

    switch (action.type) {
        case 'SET_BOARDS':
            newState = {
                ...state,
                boards: [...action.boards],
                isLoadingBoards: false
            }
            break
        case 'SET_BOARD':
            return { ...state, selectedBoard: action.board, isLoadingBoard: false }
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
        case 'SET_LOADING_BOARD':
            newState = { ...state, isLoadingBoard: action.payload }
            break;
        case 'SET_LOADING_BOARDS':
            newState = { ...state, isLoadingBoards: action.payload }
            break;
        case 'SET_APP_LOADED':
            newState = { ...state, hasAppLoaded: true }
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