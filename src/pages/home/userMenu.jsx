import { useContext } from 'react'
import { homeContext } from './context/homecontext'
import { LuSettings } from 'react-icons/lu'
import { tabs } from './utils/tabs'

function UserMenu() {

  const {userDetails, setTab, setUserProfileId} = useContext(homeContext)

  const handleProfileClick = () => {
    setUserProfileId(userDetails.userid)
    setTab(tabs.USER_PROFILE)
  }

  return (
    <>
      {
        userDetails &&
        <div className='w-full flex items-center justify-center rounded-md px-4 py-3 bg-zinc-900'>
          <img className='h-8 w-8 rounded-full mr-4 object-cover' src={userDetails.image}></img>
          <div className='flex flex-col flex-1 overflow-hidden mr-4'>
            <span className='min-w-0 text-xs font-bold text-ellipsis overflow-hidden whitespace-nowrap'>{userDetails.username}</span>
            <span className='min-w-0 text-zinc-500 text-xs text-ellipsis overflow-hidden whitespace-nowrap'>{userDetails.status}</span>
          </div>
          <button className='p-0 text-zinc-500 hover:text-zinc-300' onClick={handleProfileClick}>
            <LuSettings/>
          </button>
        </div>
      }
      {
        !userDetails &&
        <UserMenuLoader/>
      }
    </>
  )
}

function UserMenuLoader() {
  return (
    <div className='w-full flex items-center rounded-md px-4 py-3 bg-zinc-900'>
      <div className='h-8 w-8 min-w-max flex-shrink-0 bg-zinc-800 rounded-full mr-4 animate-pulse'></div>
      <div className='flex flex-col flex-1 mr-4'>
        <div className='w-24 h-3 rounded-md bg-zinc-800 animate-pulse mb-1'></div>
        <div className='w-40 h-3 rounded-md bg-zinc-800 animate-pulse'></div>
      </div>
      <div className='text-zinc-600 h-4 rounded-md ml-auto animate-pulse'>
        <LuSettings/>
      </div>
    </div>
  )
}

export default UserMenu
