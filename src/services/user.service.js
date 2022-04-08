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
    update,
    getMiniLoggedInUser,
    getMiniUsers,
    getGoogleId
}

// AUTH
async function login(credentials) {
    const user = await httpService.post('auth/login', credentials)
    await _setLoggedinUser(user)
    return user
}

async function signup(user) {
    const signupUser = await httpService.post('auth/signup', user)
    _setLoggedinUser(signupUser)
    return signupUser
}

async function logout() {
    const signupUser = await httpService.post('auth/logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(signupUser))
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

async function getGoogleId() {
    const id = await httpService.get('auth/googleid')
    return id
}

// SESSION STORAGE
function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function getMiniLoggedInUser() {
    const user = getLoggedinUser()
    delete user.username
    delete user.mentions
    delete user.createdAt
    return user
}

async function getMiniUsers() {
    let users = await getUsers();
    users = users.map(user => {
        delete user.username
        delete user.mentions
        delete user.createdAt
        return user
    })

    return users;
}

function _setLoggedinUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}


