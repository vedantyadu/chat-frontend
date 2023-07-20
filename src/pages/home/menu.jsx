import { useContext } from 'react'
import { MdAlternateEmail } from 'react-icons/md'
import { LuView } from 'react-icons/lu'
import { FaRegUserCircle } from 'react-icons/fa'
import { homeContext } from './context/homecontext'
import { tabs } from './utils/tabs'

function Menu() {

  const {groups, curGroup, setTab} = useContext(homeContext)

  return (
    <>
      {
        curGroup &&
        <div className='w-full flex items-center p-4 bg-zinc-900 rounded-md mb-2'>
          <div className='flex justify-center items-center'>
            <MdAlternateEmail className='text-zinc-500 mr-2'/>
            <span className='text-ellipsis overflow-hidden whitespace-nowrap mr-2'>{groups?.[curGroup]?.name}</span>
          </div>
          <div className='flex justify-center items-center ml-auto text-zinc-500'>
            <button className='p-0 hover:text-zinc-300' onClick={() => setTab(tabs.GROUP_PROFILE)}>
              <LuView/>
            </button>
          </div>
        </div>
      }
      {
        !curGroup &&
        <div className='w-full flex items-center p-4 bg-zinc-900 rounded-md mb-2 opacity-60'>
          <div className='w-full h-6'></div>
        </div>
      }
    </>

  )
}

export default Menu
