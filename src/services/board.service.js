import { storageService } from './async-storage.service'


export const boardService = {
    loadBoards,
    getById,
    removeBoard,
    updateBoard,
    addBoard
}

const STORAGE_KEY = 'boardDB'


async function loadBoards() {
    const boards = await storageService.query(STORAGE_KEY)
    console.log(boards);
    return boards
}

// getById("jWZBK")

async function getById(boardId) {
    const board = await storageService.get(STORAGE_KEY, boardId)
    console.log(board);
    return board
}

async function removeBoard(boardId) {
    await storageService.remove(STORAGE_KEY, boardId)
    return boardId
}


async function updateBoard(boardToUpdate) {
    const updatedBoard = await storageService.put(STORAGE_KEY, boardToUpdate)
    console.log(updatedBoard);
    return boardToUpdate
}

async function addBoard(boardToAdd) {
    const newBoard = await storageService.post(STORAGE_KEY, boardToAdd)
    return newBoard
}


