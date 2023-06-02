// import { io } from "socket.io-client"

// export const socket = io('http://127.0.0.1:5000', {withCredentials: true})

// export const join_room = function (roomid) {
//   console.log(roomid)
//   socket.emit('join-room', {'roomid': roomid})
// }

// export const recieve_drawing = function (pathsState, setPathsState) {
//   socket.on('draw', (data) => {
//     setPathsState({...pathsState, [data.pathid]: data.path})
//   })
// }

// export const recieve_erase = function (pathsState, setPathsState) {
//   socket.on('erase', (data) => {
//     delete pathsState[data.pathid]
//     setPathsState(pathsState)
//   })
// }

// export const send_erase = function (data) {
//   socket.emit('erase', data)
// }

// export const send_drawing = function (data) {
//   socket.emit('draw', data)
// }
