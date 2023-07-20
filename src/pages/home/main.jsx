import { useContext } from 'react'
import Menu from './menu'
import { homeContext } from './context/homecontext'
import Messages from './messages'

function Main() {

  const {curGroup} = useContext(homeContext)

  return (
    <div className='flex-1 min-w-0 mr-2 flex flex-col overflow-hidden'>
      <Menu/>
      <Messages/>
    </div>
  )
}

export default Main
