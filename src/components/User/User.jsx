import Login from '@/components/User/Login'
import Signup from '@/components/User/Signup'
import { Routes, Route } from 'react-router-dom'

function User() {
  return (
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/*' element={<span>Not found</span>}/>
    </Routes>
  )
}

export default User
