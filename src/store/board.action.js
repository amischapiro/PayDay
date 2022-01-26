import { boardService } from "../services/board.service";
import { swalService } from "../services/swal.service.js";

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
            await swalService.onDeleteSwal()
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
            const savedBoard = await boardService.addBoard(boardToSave)
            dispatch({ type: 'ADD_BOARD', board: savedBoard })
            return Promise.resolve(savedBoard)
        } catch (err) {
            console.log('Cannot Add', boardToSave)
        }
    }
}

export function setFilter(filterBy) {
    return async (dispatch) => {
        try {
            dispatch({ type: 'SET_FILTER', filterBy })
        } catch (err) {
            console.log('Encountered error on set filter:', err);
        }
    }
}

export function setSort(sortBy) {
    return async (dispatch) => {
        try{
            dispatch({ type: 'SET_SORT', sortBy })
        } catch (err) {
            console.log('Cannot sort', err)
        }
    }
}

export function setStory(story) {
    return async (dispatch) => {
        dispatch({ type: 'SET_STORY', story })

    }
}

