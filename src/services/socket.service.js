import io from 'socket.io-client'

export const SOCKET_EMIT_JOIN_BOARD_ROOM = 'join board-room'

const baseUrl = (process.env.NODE_ENV === 'production') ? '' : '//localhost:3030/'

export const socketService = createSocketService()


// for debugging from console
window.socketService = socketService

socketService.setup()


function createSocketService() {
	var socket = null;
	const socketService = {
		setup() {
			socket = io(baseUrl)
		},
		on(eventName, cb) {
			socket.on(eventName, cb)
		},
		off(eventName, cb = null) {
			if (!socket) return;
			if (!cb) socket.removeAllListeners(eventName)
			else socket.off(eventName, cb)
		},
		emit(eventName, data) {
			socket.emit(eventName, data)
		},
		terminate() {
			socket = null
		}
	}
	return socketService
}

function cb(x) {console.log('Socket Test - Expected Puk, Actual:', x)}
socketService.on('baba', cb)