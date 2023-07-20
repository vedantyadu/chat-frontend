import '@/App.css'
import { Route, Routes } from 'react-router-dom'
import { configureAxios } from './utils/axiosconfig'
import PrivateRoute from './utils/PrivateRoute'
import Login from '@/pages/login/login'
import Signup from '@/pages/signup/signup'
import Home from './pages/home/home'
import { HomeState } from './pages/home/hooks/useHome'

configureAxios()

function App() {
  return (
    <HomeState>
      <Routes>
        <Route path='/join' element={<></>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<PrivateRoute element={<Home/>}/>}/>
      </Routes>
    </HomeState>
  )
}

export default App
