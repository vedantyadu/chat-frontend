import { useContext } from 'react'
import { HomeContext } from '@/components/Home/context/HomeContext'
import { homeTabs } from '@/components/Home/utils/tabs'
import { FaUserCircle } from 'react-icons/fa'
import { FiSettings } from 'react-icons/fi'

function useMenu() {
  const {setHomeTab, curGroup, groupInfo} = useContext(HomeContext)
  const group_name = groupInfo?.[curGroup]?.name
  const is_admin = groupInfo?.[curGroup]?.isadmin
  return {setHomeTab, group_name, is_admin}
}

function Menu() {

  const {setHomeTab, group_name, is_admin} = useMenu()

  return (
    <div className='flex justify-end items-center w-full bg-neutral-900 mb-2 rounded-md px-4 py-2'>
      <div className='flex-1 text-white'>
        <span className='px-2'>{group_name}</span>
      </div>
      {is_admin && <button className='px-2 py-2 text-neutral-600 text-xl mr-4' onClick={() => setHomeTab(homeTabs.EDIT_GROUP)}>
        <FiSettings/>
      </button>}
      <button className='px-2 py-2 text-neutral-600 text-xl' onClick={() => setHomeTab(homeTabs.PROFILE)}>
        <FaUserCircle/>
      </button>
    </div>
  )
}

export default Menu
