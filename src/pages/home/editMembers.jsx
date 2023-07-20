import { useContext, useRef, useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { MdAlternateEmail } from 'react-icons/md'
import { AiOutlinePlus } from 'react-icons/ai'
import { homeContext } from './context/homecontext'
import { tabs } from './utils/tabs'
import { EditMemberCard } from './memberCard'
import axios from 'axios'
import { socket } from '../../socket/socket'


function EditMembers() {

  const {setTab, curGroup, groups, setGroups, members} = useContext(homeContext)
  const [error, setError] = useState('')
  const usernameInputRef = useRef()

  const addUser = async () => {
    try {
      const response = await axios.post('/group/adduser', {
        groupid: curGroup,
        username: usernameInputRef.current.value
      })
    }
    catch (err) {
      setError(err.response.data.message)
    }
  }

  const removeUser = async (userid) => {
    try {
      const response = await axios.post('/group/removeuser', {groupid: curGroup,userid: userid})
    }
    catch (err) {
      setError(err.response.data.message)
    }
  }


  return (
    <div className='min-h-full bg-zinc-900 rounded-md px-4 pt-4 pb-16 flex flex-col items-center'>
      <div className='w-full flex justify-end mb-20'>
        <button className='text-zinc-600 border-2 text-lg border-zinc-600 p-2 rounded-full hover:text-zinc-300 hover:border-zinc-300' onClick={() => setTab(tabs.HOME)}>
          <RiCloseLine/>
        </button>
      </div>
      <div className='flex flex-col w-80 max-w-full'>
        <span className='mb-1 font-bold text-2xl'>Member settings</span>
        <span className='mb-2 text-xs text-zinc-500'>Invite or manage members.</span>
        <div className='text-red-400 text-sm w-full h-8 mb-4 flex items-end'>{error}</div>
        {
          curGroup &&
          <div className='w-full flex items-center mb-6'>
            <MdAlternateEmail className='text-zinc-500 mr-1'/>
            <span>{groups?.[curGroup]?.name}</span>
          </div>
        }
        <div className='mb-2 w-full self-start font-bold text-zinc-500 flex items-center'>
          <span>Invite</span>
        </div>
        <label>Username</label>
        <div className='flex mb-6'>
          <input ref={usernameInputRef} className='flex-1 mr-2 min-w-0'></input>
          <button className='w-10 h-10 flex items-center justify-center text-lg rounded-md p-0 bg-gradient-to-r from-sky-700 to to-cyan-700' onClick={addUser}>
            <AiOutlinePlus/>
          </button>
        </div>
        <div className='mb-4 w-full self-start font-bold text-zinc-500 flex items-center'>
          <span>Manage</span>
        </div>
        {
          curGroup &&
          <div className='flex flex-col'>
            {Object.keys(members[curGroup]).filter((id) => members[curGroup][id].current_member).map((id) => <EditMemberCard key={id} removeUser={() => removeUser(id)} details={{username: members[curGroup][id].username, image: members[curGroup][id].image, id: id}}/>)}
          </div>
        }
      </div>
    </div>
  )
}

export default EditMembers
