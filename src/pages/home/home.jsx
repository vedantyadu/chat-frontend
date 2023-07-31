import axios from 'axios'
import Groups from './groups'
import { useContext, useEffect } from 'react'
import Members from './members'
import CreateGroup from './createGroup'
import { homeContext } from './context/homecontext'
import { tabs } from './utils/tabs'
import Main from './main'
import EditMembers from './editMembers'
import GroupProfile from './groupProfile'
import UserProfile from './userProfile'
import { useSocket, socket } from '../../socket/socket'

function Home() {
  
  useSocket()
  const {tab, setGroups, setCurGroup, setUserDetails} = useContext(homeContext)
  
  useEffect(() => {
    socket.connect()
    const getUserDetails = async () => {
      const response = await axios.get('/user/details')
      setUserDetails(response.data)
    }
    const getGroupData = async (groupid) => {
      const response = await axios.get(`/group/data/${groupid}`)
      response.data.notification = false
      return response.data
    }
    const getGroups = async () => {
      const response = await axios.get('/user/groups')
      const temp = {}
      for (let i = 0; i < response.data.groups.length; i++) {
        const group_data = await getGroupData(response.data.groups[i])
        temp[response.data.groups[i]] = group_data
      }
      setGroups(temp)
      setCurGroup(Object.keys(temp)[0])
    }
    getGroups()
    getUserDetails()
  }, [])

  return (
    <>
      {tab == tabs.HOME && 
        <div className='w-full h-full flex'>
          <Groups/>
          <Main/>
          <Members/>
        </div>
      }
      {tab == tabs.CREATE_GROUP && <CreateGroup/>}
      {tab == tabs.EDIT_MEMBERS && <EditMembers/>}
      {tab == tabs.GROUP_PROFILE && <GroupProfile/>}
      {tab == tabs.USER_PROFILE && <UserProfile/>}
    </>
  )
}

export default Home
