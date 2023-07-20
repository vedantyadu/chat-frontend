import io from 'socket.io-client'
import { useContext, useEffect } from 'react'
import { homeContext } from '../pages/home/context/homecontext'

export const socket = io('https://chat-backend-71wr.onrender.com:5000', {withCredentials: true, autoConnect: false})

export function useSocket() {

  const {messages, setMessages, groups, setGroups, setCurGroup, members, setMembers, curGroup} = useContext(homeContext)

  useEffect(() => {

    socket.on('user-online', (data) => {
      if (members?.[data.groupid]?.[data.userid]) {
        const temp = Object.assign({}, members)
        temp[data.groupid][data.userid].online = true
        setMembers(temp)
      }
    })
    
    socket.on('user-offline', (data) => {
      if (members?.[data.groupid]?.[data.userid]) {
        const temp = Object.assign({}, members)
        temp[data.groupid][data.userid].online = false
        setMembers(temp)
      }
    })

    socket.on('new-message', (data) => {
      if (messages[data.groupid]) {
        let temp = Object.assign({}, messages)
        temp[data.groupid].push(data.details)
        setMessages(temp)
      }
    })

    socket.on('new-group', (data) => {
      if (groups) {
        const temp = Object.assign({}, groups)
        temp[data.groupid] = data.details
        setGroups(temp)
        setCurGroup(data.groupid)
      }
    })

    socket.on('member-removed', (data) => {
      if (members?.[data.groupid]) {
        const temp = Object.assign({}, members)
        temp[data.groupid][data.userid].current_member = false
        setMembers(temp)
      }
    })
 
    socket.on('member-added', (data) => {
      if (members?.[data.groupid]) {
        const temp = Object.assign({}, members)
        temp[data.groupid][data.userid] = data.details
        setMembers(temp)
      }
    })

    socket.on('group-invite', (data) => {
      if (groups) {
        setGroups({...groups, [data.groupid]: data.details})
      }
    })

    socket.on('group-remove', (data) => {
      if (groups?.[data.groupid]) {
        const temp = Object.assign({}, groups)
        delete temp[data.groupid]
        setCurGroup(Object.keys(temp)[0])
        setGroups(temp)
      }
      if (messages?.[data.groupid]) {
        const temp = Object.assign({}, messages)
        delete temp[data.groupid]
        setMessages(temp)
      }
      if (members?.[data.groupid]) {
        const temp = Object.assign({}, members)
        delete temp[data.groupid]
        setMembers(temp)
      }
    })

    socket.on('group-change', (data) => {
      if (groups?.[data.groupid]) {
        const temp = Object.assign({}, groups)
        if (data.image) {
          temp[data.groupid][image] = data.image
        }
        temp[data.groupid].name = data.name
        temp[data.groupid].description = data.description
        setGroups(temp)
      }
    })

    socket.on('user-change', (data) => {
      if (members?.[data.groupid]?.[data.userid]) {
        const temp = Object.assign({}, members)
        if (data.image) {
          temp[data.groupid][data.userid].image = data.image
        }
        temp[data.groupid][data.userid].username = data.username
        temp[data.groupid][data.userid].status = data.status
        setMembers(temp)
      }
    })

    socket.on('group-delete', (data) => {
      if (groups?.[data.groupid]) {
        const temp = Object.assign({}, groups)
        delete temp[data.groupid]
        setCurGroup(Object.keys(temp)[0])
        setGroups(temp)
      }
      if (messages?.[data.groupid]) {
        const temp = Object.assign({}, messages)
        delete temp[data.groupid]
        setMessages(temp)
      }
      if (members?.[data.groupid]) {
        const temp = Object.assign({}, members)
        delete temp[data.groupid]
        setMembers(temp)
      }
    })

    socket.on('user-left', (data) => {
      const temp = Object.assign({}, members)
      temp[data.groupid][data.userid].current_member = false
      setMembers(temp)
    })

    socket.on('new-admin', (data) => {
      console.log('new-admin')
      const temp = Object.assign({}, groups)
      temp[data.groupid].admin = true
      setGroups(temp)
    })

    return () => {
      socket.off('new-message')
      socket.off('user-offline')
      socket.off('user-online')
      socket.off('new-group')
      socket.off('member-removed')
      socket.off('member-added')
      socket.off('group-invite')
      socket.off('group-remove')
      socket.off('group-change')
      socket.off('group-delete')
      socket.off('user-change')
      socket.off('user-left')
      socket.off('new-admin')
    }
  })
}
