import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function useLogin() {

  const navigate = useNavigate()
  const [data, setData] = useState({
    'username': '',
    'password': ''
  })
  
  const submitFrom = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/user/login', data)
      navigate('/')
    }
    catch {
      
    }
  }

  return {data, setData, submitFrom}
}

function Login() {

  const {data, setData, submitFrom} = useLogin()

  return (
    <div className='w-full h-full flex justify-center items-center bg-neutral-900'>
      <div className="flex items-center w-full max-w-7xl h-full px-8">
        <div className='flex flex-col items-center justify-center'>
          <span className='w-full text-white font-bold text-4xl mb-8 text-left'>Login</span>
          <form className='flex flex-col items-center justify-center' onSubmit={submitFrom}>
            <label className='mb-1 text-sm text-neutral-600 w-full'>Username</label>
            <input 
              className='mb-4 p-2 w-72' 
              onChange={(e) => setData({...data, 'username': e.target.value})}
            />
            <label className='mb-1 text-sm text-neutral-600 w-full'>Password</label>
            <input 
              className='mb-6 p-2 w-72' 
              type='password' 
              onChange={(e) => setData({...data, 'password': e.target.value})}
            />
            <input value='Login' type='submit' className='mb-8 w-72'/>
          </form>
          <span className='text-neutral-600 mr-1'>
            Don't have an account? <Link className='text-neutral-400' to='/user/signup'>Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Login
