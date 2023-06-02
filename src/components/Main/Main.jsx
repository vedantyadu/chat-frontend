import GroupNav from '@/components/Home/GroupNav'
import Whiteboard from '@/components/Home/Whiteboard'
import Members from '@/components/Home/Members'
import Menu from '@/components/Home/Menu'

function Main() {
  return (
    <>
      <GroupNav/>
      <div className='flex flex-col flex-1 h-full mr-2'>
        <Menu/>
        <Whiteboard/>
      </div>
      <Members/>
    </>
  )
}

export default Main
