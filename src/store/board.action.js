import { boardService } from "../services/board.service";

export function loadBoards() {
    return async (dispatch, getState) => {
        const state = getState()
        const { loggedinUser } = state.userModule
        try {
            const boards = await boardService.query(loggedinUser._id)
            dispatch({ type: 'SET_BOARDS', boards })
            return Promise.resolve(boards)
        } catch (error) {
            console.log('Cannot get Boards', error);
            dispatch({ type: 'SET_LOADING_BOARDS', payload: false })
        }
    }
}

export function getById(boardId) {
    return async (dispatch) => {
        try {
            const board = await boardService.getById(boardId)
            dispatch({ type: 'SET_BOARD', board })
            return board
        } catch (error) {
            console.log('Cannot get Boards', error);
            dispatch({ type: 'SET_LOADING_BOARD', payload: false })
        }
    }
}

export function removeBoard(boardId) {
    return async (dispatch) => {
        try {
            // await swalService.onDeleteSwal()
            await boardService.remove(boardId)
            dispatch({ type: 'REMOVE_BOARD', boardId })
            return Promise.resolve()
        } catch (err) {
            throw err
        }
    }
}

export function updateBoard(boardToUpdate) {
    return async (dispatch, getState) => {
        const state = getState()
        const { selectedBoard } = state.boardModule
        const backupBoard = JSON.parse(JSON.stringify(selectedBoard))
        try {
            dispatch({ type: 'UPDATE_BOARD', board: boardToUpdate })
            await boardService.save(boardToUpdate)
        } catch (error) {
            console.log(error);
            dispatch({ type: 'UPDATE_BOARD', board: backupBoard })
            throw new Error('Cannot update, retrieving last update')
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

export function setStory(story) {
    return async (dispatch) => {
        dispatch({ type: 'SET_STORY', story })
    }
}

export function setFilterBy(filterBy) {
    return async (dispatch) => {
        dispatch({ type: 'SET_FILTER', filterBy })
    }
}

export function setAppLoaded() {
    return async (dispatch) => {
        dispatch({ type: 'SET_APP_LOADED' })
    }
}