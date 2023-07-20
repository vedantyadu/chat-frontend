import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function PrivateRoute({element}) {
  const [auth, setAuth] = useState()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('/user/auth')
        setAuth(true)
      }
      catch {
        setAuth(false)
      }
    }
    checkAuth()
  }, [])

  if (auth == false) {
    return (<Navigate to='/login'/>)
  }
  else {
    if (auth == true) {
      return element
    }
    else {
      return (
        <div className='w-full h-full flex'></div>
      )
    }
  }
}

export default PrivateRoute
