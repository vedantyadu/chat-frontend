import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function useAuth() {

  const [auth, setAuth] = useState(true)

  useEffect(() => {
    const authorize = async () => {
      try {
        await axios.get('/user/auth')
      }
      catch (err) {
        setAuth(false)
      }
    }
    authorize()
  }, [])

  return {auth}
}

function PrivateRoute({children}) {
  const {auth} = useAuth()
  return auth? children: <Navigate to='/user/login'/>
}

export default PrivateRoute
