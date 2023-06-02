import {FiPlus} from 'react-icons/fi'
import { useContext } from 'react'
import { HomeContext } from './context/HomeContext'
import { homeTabs } from './utils/tabs'
import GroupIcon from './GroupIcon'

function useGroupNav() {

  const {setHomeTab, groupInfo} = useContext(HomeContext)

  const create_group = async () => {
    setHomeTab(homeTabs.CREATE_GROUP)
  }

  return {create_group, groupInfo}
}

function GroupNav() {

  const {create_group, groupInfo} = useGroupNav()

  return (
    <div className='flex-none bg-neutral-900 flex flex-col mr-2 rounded-md'>
      <div className='flex justify-center items-center px-3 py-2'>
        <button className='w-12 h-12 flex justify-center items-center bg-neutral-800 rounded-full' onClick={create_group}>
          <FiPlus className='text-neutral-600 text-2xl'/>
        </button>
      </div>
      <div className='px-3 my-1'>
        <div className='h-[2px] w-full bg-neutral-800 rounded-full'></div>
      </div>
      {groupInfo != undefined && Object.keys(groupInfo).map((id) => {
        const group_details = groupInfo[id]
        return <GroupIcon name={group_details.name} image={group_details.image} id={id} key={id}/>
      })}
    </div>
  )
}

export default GroupNav
