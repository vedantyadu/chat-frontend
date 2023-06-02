import axios from 'axios'
import { useContext, useEffect, useState, useRef } from 'react'
import { HomeContext } from '@/components/Home/context/HomeContext'
import { homeTabs, mainTabs } from '@/components/Home/utils/tabs'
import CreateGroup from '@/components/CreateGroup/CreateGroup'
import Main from '@/components/Main/Main'
import Profile from '@/components/Profile/Profile'
import { io } from 'socket.io-client'
import EditGroup from '@/components/EditGroup/EditGroup'

function useHome() {

  const defaultImage = useRef()
  const [homeTab, setHomeTab] = useState(homeTabs.MAIN)
  const [mainTab, setMainTab] = useState(mainTabs.WHITEBOARD)
  const [groupInfo, setGroupInfo] = useState()
  const [curGroup, setCurGroup] = useState()
  const [onlineUsers, setOnlineUsers] = useState({})
  const socket = useRef()

  useEffect(() => {
    const get_groups = async () => {
      const response = await axios.get('/group')
      setGroupInfo(response.data.groups)
      setOnlineUsers(response.data.user_online)
      setCurGroup(Object.keys(response.data.groups)[0])
      defaultImage.current = response.data.default_image
      socket.current = io('http://127.0.0.1:5000', {withCredentials: true})
    }
    get_groups()
  }, [])

  useEffect(() => {
    
  }, [curGroup])

  return {homeTab, setHomeTab, mainTab, setMainTab, groupInfo, setGroupInfo, curGroup, setCurGroup, onlineUsers, defaultImage}
}

function Home() {

  const values = useHome()
  const homeTab = values.homeTab

  return (
    <HomeContext.Provider value={values}>
      <div className="w-full h-full flex flex-row bg-neutral-950 p-2">
        {homeTab == homeTabs.PROFILE && <Profile/>}
        {homeTab == homeTabs.CREATE_GROUP && <CreateGroup/>}
        {homeTab == homeTabs.EDIT_GROUP && <EditGroup/>}
        {homeTab == homeTabs.MAIN && <Main/>}
      </div>
    </HomeContext.Provider>
  )
}

export default Home
