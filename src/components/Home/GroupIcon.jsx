import { useContext } from 'react'
import { HomeContext } from '@/components/Home/context/HomeContext'

function useGroupIcon() {
  const {curGroup, setCurGroup} = useContext(HomeContext)
  const is_current_group = (groupid) => {
    return curGroup == groupid? 'scale-y-100 bg-white': 'scale-y-0 bg-neutral-700 group-hover:scale-y-50'
  }
  return {is_current_group, setCurGroup}
}

function GroupIcon({id, name, image}) {

  const {is_current_group, setCurGroup} = useGroupIcon()

  return (
    <div className='flex justify-center align-center w-full relative px-3 py-2 mb-1 group'>
      <div className={`rounded-r-full h-2/3 w-1 absolute top-1/2 left-0 -translate-y-1/2 transition-transform duration-100 ${is_current_group(id)}`}></div>
      <button className='w-12 h-12 flex justify-center items-center bg-neutral-800 rounded-full overflow-hidden' onClick={() => setCurGroup(id)}>
        <img src={image}/>
      </button>
    </div>
  )
}

export default GroupIcon
