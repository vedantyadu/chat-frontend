import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function useSignup() {
  
  const navigate = useNavigate()
  const [data, setData] = useState({
    'username': '',
    'password': '',
    'email': ''
  })
  
  const submitFrom = async (e) => {
    e.preventDefault()
    const response = await axios.post('/user/signup', data)
    if (response.status == 200) {
      navigate('/user/login')
    }
  }

  return {data, setData, submitFrom}
}


function Signup() {

  const {data, setData, submitFrom} = useSignup()

  return (
    <div className='w-full h-full flex justify-center items-center bg-neutral-900'>
      <div className="flex items-center w-full max-w-7xl h-full px-8">
        <div className='flex flex-col items-center justify-center'>
          <span className='w-full text-white font-bold text-4xl mb-8 text-left'>
            Sign Up
          </span>
          <form className='flex flex-col items-center justify-center' onSubmit={submitFrom}>
            <label className='mb-1 text-sm text-neutral-600 w-full'>Email</label>
            <input 
              className='mb-4 p-2 w-72' 
              type='email'
              onChange={(e) => setData({...data, 'email': e.target.value})}
            />
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
            <input value='Sign up' type='submit' className='mb-8 w-72'/>
          </form>
          <span className='text-neutral-600'>
            Already have an account? <Link className='text-neutral-400' to='/user/login'>Login</Link>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Signup
