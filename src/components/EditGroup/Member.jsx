import { FiMinus } from 'react-icons/fi'

function Member({userinfo}) {
  return (
    <div className='flex items-center mb-4 text-white'>
      <div className='h-12 w-12 rounded-full overflow-hidden mr-4'>
        <img src={userinfo.image}/>
      </div>
      <span className='text-ellipsis flex-1 whitespace-nowrap overflow-hidden'>{userinfo.username}</span>
      <button className='bg-red-500 w-10 h-10 flex justify-center items-center text-xl rounded-md'><FiMinus/></button>
    </div>
  )
}

export default Member
