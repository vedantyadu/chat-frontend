import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from '@/components/Home/Home'
import User from '@/components/User/User'
import { configureAxios } from './utils/axiosconfig'
import PrivateRoute from './utils/PrivateRoute'

configureAxios()

function App() {
  return (
    <Routes>
      <Route path='/user/*' element={<User/>}/>
      <Route path='/' element={<PrivateRoute><Home/></PrivateRoute>}/>
    </Routes>
  )
}

export default App
