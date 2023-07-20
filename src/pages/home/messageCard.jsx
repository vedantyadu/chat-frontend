import { useContext, useEffect } from 'react'
import { homeContext } from './context/homecontext'

function MessageCard({details}) {

  const {members, curGroup} = useContext(homeContext)

  if (details.type == 'message') {
    return (
      <div className='w-full flex mb-4 first:mt-auto last:mb-0'>
        {
          members?.[curGroup]?.[details.author]?.image &&
          <img className='h-8 w-8 rounded-full mr-4 object-cover' src={members?.[curGroup]?.[details.author]?.image}></img>
        }
        {
          !members?.[curGroup]?.[details.author]?.image &&
          <div className='h-8 w-8 rounded-full mr-4 bg-zinc-700'></div>
        }
        <div className='flex flex-col justify-start'>
          {
            members?.[curGroup]?.[details.author]?.username &&
            <span className='text-sm -mt-1 text-zinc-400'>{members?.[curGroup]?.[details.author]?.username}</span>
          }
          {
            !members?.[curGroup]?.[details.author]?.username &&
            <span className='text-sm -mt-1 text-red-400'>User left</span>
          }
          <span className='whitespace-pre-line break-all'>{details.message}</span>
        </div>
      </div>
    )
  }
  else if (details.type == 'create') {
    return(
      <div className='w-full text-zinc-500 flex justify-center whitespace-pre-line break-all mb-4 first:mt-auto last:mb-0'>
        <span><span className='font-bold'>{members?.[curGroup]?.[details.author]?.username}</span> created the group</span>
      </div>
    )
  }
  else if (details.type == 'join') {
    return(
      <div className='w-full text-zinc-500 flex justify-center whitespace-pre-line break-all mb-4 first:mt-auto last:mb-0'>
        <span><span className='font-bold'>{members?.[curGroup]?.[details.author]?.username}</span> joined the group</span>
      </div>
    )
  }
  else if (details.type == 'leave') {
    return(
      <div className='w-full text-zinc-500 flex justify-center whitespace-pre-line break-all mb-4 first:mt-auto last:mb-0'>
        <span><span className='font-bold'>{members?.[curGroup]?.[details.author]?.username}</span> left the group</span>
      </div>
    )
  }
}

export default MessageCard
