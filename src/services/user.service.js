import { httpService } from './http.service'

const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUserById,
    getUsers,
    remove,
    update
}

// AUTH


async function login(credentials) {
    const user = await httpService.post('auth/login', credentials)
    _setLoggedinUser(user)
    return user
}

async function signup(user) {

    const signupUser = await httpService.post('auth/signup', user)
    _setLoggedinUser(signupUser)
    return signupUser
}

async function logout() {
    const signupUser = await httpService.post('auth/logout')
    _setLoggedinUser(null)
    return signupUser
}



// User


async function getUsers() {
    const users = await httpService.get('user/')
    return users
}

async function getUserById(userId) {
    const user = await httpService.get(`user/${userId}`)
    return user
}


async function remove(userId) {
    const data = await httpService.delete(`user/${userId}`)
    return data
}

async function update(userToUpdate) {
    const userId = userToUpdate._id
    const updatedUser = await httpService.put(`user/${userId}`, userToUpdate)
    return updatedUser
}

// SESSION STORAGE

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}

