import { boardService } from "../services/board.service";
import { swalService } from "../services/swal.service.js";

export function loadBoards() {
    return async (dispatch, getState) => {
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
    return async (dispatch) => {
        try {
            let board = await boardService.getById(boardId)            
            board = _filterBoard(board);
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

export function setStory(story) {
    return async (dispatch) => {
        dispatch({ type: 'SET_STORY', story })

    }
}

function _filterBoard(board) {
    const { filterBy } = board;
    if (filterBy === {}) return board;

    if (filterBy?.name) board.groups.forEach((group, idx) => {
        const stories = group.stories.filter(story => {
            return story.title.toLowerCase().includes(filterBy.name)
        })
        board.groups[idx].stories = stories;
    });

    if (filterBy?.priority) board.groups.forEach((group, idx) => {
        const stories = group.stories.filter(story => {
            return story.storyData.priority.title === filterBy.priority;
        })
        board.groups[idx].stories = stories;
    });

    if (filterBy?.status) board.groups.forEach((group, idx) => {
        const stories = group.stories.filter(story => {
            return story.storyData.status.title === filterBy.status;
        })
        board.groups[idx].stories = stories;
    });

    if (filterBy?.members) board.groups.forEach((group, idx) => {
        const stories = group.stories.filter(story => {
            return story.storyData.status.members.some(member => {
                return filterBy.members.some(filterMem => {
                    return filterMem.id === member._id;
                });
            })
        })
        board.groups[idx].stories = stories;
    });
    return board;
}