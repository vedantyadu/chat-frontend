import { useContext } from 'react'
import { FiMinus } from 'react-icons/fi'
import { homeContext } from './context/homecontext'
import { tabs } from './utils/tabs'

export function MemberCard({id, details}) {

  const {setUserProfileId, setTab} = useContext(homeContext)

  const handleClick = () => {
    setUserProfileId(id)
    setTab(tabs.USER_PROFILE)
  }

  return (
    <button className='w-full flex items-center text-sm rounded-md p-2 mb-1 hover:bg-zinc-800' onClick={handleClick}>
      <img className='h-8 w-8 rounded-full mr-4 object-cover' src={details.image}></img>
      <div className='flex flex-col items-start flex-1 overflow-hidden'>
        <span className='w-full text-left text-xs text-ellipsis overflow-hidden whitespace-nowrap'>{details.username}</span>
        <span className='w-full text-left text-zinc-500 text-xs text-ellipsis overflow-hidden whitespace-nowrap'>{details.status}</span>
      </div>
    </button>
  )
}

export function EditMemberCard({details, removeUser}) {

  const {userDetails} = useContext(homeContext)

  return (
    <div className='w-full flex items-center text-sm rounded-md mb-4'>
      <img className='h-10 w-10 rounded-full mr-4 object-cover' src={details.image}></img>
      <span className='flex-1 min-w-0'>{details.username}</span>
      {
        details.id != userDetails.userid &&
        <button className='w-10 h-10 p-0 flex items-center justify-center text-xl rounded-md bg-zinc-700 hover:bg-red-500 hover: text-white' onClick={removeUser}>
          <FiMinus/>
        </button>
      }
    </div>
  )
}
