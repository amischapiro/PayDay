import { boardService } from "../services/board.service";

export function loadBoards() {
    return async (dispatch, getState) => {
        const { filterBy, sortBy } = getState().boardModule
        try {
            const boards = await boardService.query()
            // console.log(boards);
            dispatch({ type: 'SET_BOARDS', boards })
            return Promise.resolve(boards)
        } catch (error) {
            console.log('Cannot get Boards', error);
        }
    }
}


export function getById(boardId) {
    // console.log(boardId);
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            // console.log('board.action.js 💤 23: ', board);
            dispatch({ type: 'SET_BOARD', board })
            return board
        } catch (error) {
            console.log('Cannot get Boards', error);
        }
    }
}


export function removeBoard(boardId) {
    return async (dispatch) => {
        try {
            await boardService.remove(boardId)
            dispatch({ type: 'REMOVE_BOARD', boardId })
            return Promise.resolve()
        } catch (err) {
            throw err
        }
    }
}

export function updateBoard(boardToUpdate) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(boardToUpdate)
            dispatch({ type: 'UPDATE_BOARD', board: savedBoard })
            return Promise.resolve(savedBoard)
        } catch (err) {
            console.log('Cannot Update', boardToUpdate)
        }
    }
}

export function addBoard(boardToSave) {
    return async (dispatch) => {
        try {
            const savedBoard = await boardService.save(boardToSave)
            dispatch({ type: 'ADD_BOARD', board: savedBoard })
            return Promise.resolve(savedBoard)
        } catch (err) {
            console.log('Cannot Add', boardToSave)
        }
    }
}

export function setFilter(filterBy) {
    return async (dispatch) => {
        dispatch({ type: 'SET_FILTER', filterBy })
        return Promise.resolve()
    }
}

export function setSort(sortBy) {
    return async (dispatch) => {
        dispatch({ type: 'SET_SORT', sortBy })
        return Promise.resolve()
    }
}


