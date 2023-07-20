import { useContext, useEffect} from 'react'
import { RiUserSettingsLine } from 'react-icons/ri'
import { homeContext } from './context/homecontext'
import { MemberCard } from './memberCard'
import { tabs } from './utils/tabs'
import UserMenu from './userMenu'
import axios from 'axios'

function Members() {

  const {setTab, curGroup, groups, members, setMembers} = useContext(homeContext)

  useEffect(() => {
    const getMembers = async () => {
      if (curGroup && !members?.[curGroup]) {
        const response = await axios.get(`/group/members/${curGroup}`)
        const temp = Object.assign({}, members)
        temp[curGroup] = response.data
        setMembers(temp)
      }
    }
    getMembers()
  }, [curGroup])

  const onlineUsers = []
  const offlineUsers = []

  if (members?.[curGroup]) {
    Object.keys(members[curGroup]).filter(id => members[curGroup][id].current_member).map((id) => {
      if (members[curGroup][id].online) {
        onlineUsers.push(<MemberCard key={id} id={id} details={{username: members[curGroup][id].username, image: members[curGroup][id].image, status: members[curGroup][id].status}}/>)
      }
      else if (!members[curGroup][id].online) {
        offlineUsers.push(<MemberCard key={id} id={id} details={{username: members[curGroup][id].username, image: members[curGroup][id].image, status: members[curGroup][id].status}}/>)
      }
    })
  }

  return (
    <div className='w-72 flex flex-col'>
      {
        members?.[curGroup] &&
        <div className='w-full min-h-0 flex-1 bg-zinc-900 rounded-md flex flex-col px-2 py-4 items-center mb-2 overflow-y-auto no-scrollbar'>
          <div className='mb-4 w-full self-start px-2 font-bold text-zinc-500 flex items-center'>
            <span>Members</span>
            {
              groups[curGroup]['admin'] &&
              <button className='ml-auto p-0 text-md hover:text-zinc-300' onClick={() => setTab(tabs.EDIT_MEMBERS)}>
                <RiUserSettingsLine/>
              </button>
            }
          </div>
          <span className='self-start px-2 mb-2 text-zinc-700 text-sm font-bold'>Online - {onlineUsers.length}</span>
          <div className='w-full'>
            {onlineUsers}
          </div>
          <span className='self-start px-2 my-2 text-zinc-700 text-sm font-bold'>Offline - {offlineUsers.length}</span>
          <div className='opacity-60 w-full'>
            {offlineUsers}
          </div>
        </div>
      }
      {
        !curGroup && !members?.[curGroup] &&
        <div className='min-h-0 flex-1 w-72 bg-zinc-900 rounded-md px-2 py-4 opacity-60 mb-2'></div>
      }
      {
        curGroup && !members?.[curGroup] &&
        <div className='min-h-0 flex-1 w-72 bg-zinc-900 rounded-md px-2 py-4 mb-2'></div>
      }
      <UserMenu/>
    </div>
  )
}

export default Members
