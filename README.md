# ChatApp
A group chat app built using the **MERN** stack and **Socket.io**.    

This repository contains the frontend for ChatApp created using React.    
#### 🔗 [Visit the website](https://chatapp.vedantyadu.online/)
#### 🔗 [Backend Github repository](https://github.com/vedantyadu/chat-backend)
## Getting started
### Installing dependencies
```bash
npm install
```
### Changing backend URLs
#### Socket server
Change the socket server URL in [`/src/socket/socket.jsx`](./src/socket/socket.jsx) in the following format :
```js
export const socket = io('<YOUR_SOCKET_SERVER_URL>', {withCredentials: true, autoConnect: false})
```
#### Backend server
Change the backend server URL in [`/src/utils/axiosconfig.js`](./src/utils/axiosconfig.js) in the following format :
```js
export function configureAxios() {
  axios.defaults.baseURL = '<YOUR_BACKEND_SERVER_URL>'
  axios.defaults.withCredentials = true
}
```
