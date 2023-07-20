import { useContext } from 'react'
import { homeContext } from './context/homecontext'

export function GroupButton({id, details}) {

  const {curGroup, setCurGroup} = useContext(homeContext)

  return (
    <button className={`w-full flex items-center text-sm rounded-md p-2 mb-1 ${curGroup == id? 'bg-zinc-800': 'hover:bg-zinc-800'}`} onClick={() => setCurGroup(id)}>
        <img className='h-8 w-8 rounded-full mr-4 object-cover' src={details.image}></img>
        <span className='text-ellipsis overflow-hidden whitespace-nowrap'>{details.name}</span>
    </button>
  )
}

export function GroupButtonLoader() {
  return (
    <div className='w-full flex items-center text-sm  rounded-md p-2 mb-1 animate-pulse'>
      <div className='h-8 w-8 rounded-full bg-zinc-800 mr-2'></div>
      <div className='flex-1 h-4 bg-zinc-800 rounded-md'></div>
    </div>
  )
}
