import { userService } from "../services/user.service.js";

export function login(credentials) {
    return async (dispatch) => {
        try {

            const user = await userService.login(credentials)
            dispatch({ type: 'SET_USER', user })
            return Promise.resolve()
        } catch (err) {
            throw err
        }
    }
}


export function loginDemoUser(demoUser) {
    return async (dispatch) => {
        dispatch({ type: 'SET_USER', user: demoUser })
        sessionStorage.setItem('loggedinUser', JSON.stringify(demoUser))
        return Promise.resolve()
    }
}

export function logout() {
    return async (dispatch) => {
        try {
            await userService.logout()
            dispatch({ type: 'LOGOUT' })
            return Promise.resolve()
        } catch (err) {
            console.log('Cannot logout', err);
        }
    }
}

export function signup(credentials) {
    return async (dispatch) => {
        try {
            const user = await userService.signup(credentials)
            dispatch({ type: 'SET_USER', user })
            return Promise.resolve()
        } catch (err) {
            console.log('Cannot signup', err);
        }
    }
}

export function loadUsers(credentials) {
    return async (dispatch) => {
        try {
            const users = await userService.getUsers()
            dispatch({ type: 'SET_USERS', users })
            return Promise.resolve(users)
        } catch (err) {
            console.log('Cannot get users', err);
        }
    }
}

export function removeUser(userId) {
    return async (dispatch) => {
        try {
            await userService.remove(userId)
            dispatch({ type: 'REMOVE_USER', userId })
            return Promise.resolve()
        } catch (err) {
            console.log('Cannot remove user', err);
        }
    }
}

export function updateUser(userToUpdate) {
    return async (dispatch) => {
        try {
            await userService.update(userToUpdate)
            dispatch({ type: 'UPDATE_USER', user: userToUpdate })
            return Promise.resolve()
        } catch (err) {
            console.log('Cannot update user', err);
        }
    }
}

