import { useState, useRef } from 'react'
import { homeContext } from '../context/homecontext'
import { tabs } from '../utils/tabs'


export function HomeState(props) {

  const [members, setMembers] = useState()
  const [groups, setGroups] = useState()
  const [curGroup, setCurGroup] = useState()
  const [tab, setTab] = useState(tabs.HOME)
  const [userDetails, setUserDetails] = useState()
  const [userProfileId, setUserProfileId] = useState()
  const [messages, setMessages] = useState({})

  return (
    <homeContext.Provider value={{members, setMembers, groups, setGroups, curGroup, setCurGroup, tab, setTab, userDetails, setUserDetails, userProfileId, setUserProfileId, messages, setMessages}}>
      {props.children}
    </homeContext.Provider>
  )
}
