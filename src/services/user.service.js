import { httpService } from './http.service'
import { boardService } from './board.service'

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
    getMiniLoggedInUser
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

// function getLoggedinUser() {
//     return {
//         _id: "u101",
//         fullname: "Abi Abambi",
//         username: "abi@ababmi.com",
//         password: "aBambi123",
//         imgUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Stoned_Fox.jpg/1200px-Stoned_Fox.jpg",
//         mentions: [
//             {
//                 id: "m101",
//                 boardId: "m101",
//                 storyId: "t101"
//             }
//         ]
//     }
// }

function getMiniLoggedInUser() {
    const user = getLoggedinUser()
    if (!user) user = {
        _id: "u101",
        fullname: "Abi Abambi",
        imgUrl: "http://some-img"
    } 
    else {
        delete user.password
        delete user.username
        delete user.mentions
    }
    return user
}

function _setLoggedinUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
    return user
}


