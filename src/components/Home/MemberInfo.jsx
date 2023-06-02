

function MemberInfo({userinfo}) {
  return (
    <div className={`flex items-center mb-4 ${userinfo.online? '': 'opacity-40'}`}>
      <div className='h-10 w-10 rounded-full overflow-hidden mr-4'>
        <img src={userinfo.image}/>
      </div>
      <span className='text-ellipsis flex-1 whitespace-nowrap overflow-hidden'>{userinfo.username}</span>
    </div>
  )
}

export default MemberInfo
