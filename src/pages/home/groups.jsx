import { useContext, useEffect } from 'react'
import { FiPlus } from 'react-icons/fi'
import { homeContext } from './context/homecontext'
import { GroupButton, GroupButtonLoader } from './groupButton'
import { tabs } from './utils/tabs'

function Groups() {

  const {groups, setGroups, curGroup, setTab} = useContext(homeContext)

  return (
    <div className='h-full w-64 mr-2 bg-zinc-900 rounded-md flex flex-col px-2 py-4 items-center overflow-y-auto no-scrollbar'>
      <div className='mb-4 w-full self-start px-2 font-bold text-zinc-500 flex items-center'>
        <span>Groups</span>
        <button className='relative ml-auto p-0 text-md hover:text-zinc-300' onClick={() => setTab(tabs.CREATE_GROUP)}>
          <FiPlus/>
          <div className={`w-full h-full absolute top-0 left-0 rounded-full ${groups && !curGroup? 'bg-cyan-600 animate-ping': ''}`}></div>
        </button>
      </div>
      {groups && Object.keys(groups).length > 0 && Object.keys(groups).map((k) => <GroupButton key={k} id={k} details={groups[k]}/>)}
      {groups && Object.keys(groups).length < 1 && <span className='w-full p-2 text-zinc-700 text-sm'>Create or join a group.</span>}
      {!groups && Array(4).fill(0).map((i, j) => <GroupButtonLoader key={j}/>)}
    </div>
  )
}

export default Groups
