import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from '@/assets/logo.svg'


function Login() {

  const [details, setDetails] = useState({})
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    if (!details.username || details.username.length < 1) {
      setError('Enter a valid username or email.')
    }
    else if (!details.password || details.password.length < 5) {
      setError('Enter a valid password.')
    }
    else {
      try {
        const response = await axios.post('/user/login', details)
        navigate('/')
      }
      catch (err) {
        setError(err.response.data.message)
      }
    }
  }

  return (
    <div className='flex min-h-full justify-center px-4 py-16 bg-zinc-900 rounded-lg'>
      <form className='flex flex-col w-80' onSubmit={submit}>
        <img className='w-12 mb-6' src={logo}/>
        <span className='mb-1 font-bold text-2xl'>Welcome back!</span>
        <span className='mb-2 text-xs text-zinc-500'>Enter your details to Login.</span>
        <div className='text-red-400 text-sm w-full h-8 mb-4 flex items-end'>{error}</div>
        <label className='mb-1 self-start'>Username/Email</label>
        <input className='w-full mb-4' onChange={(e) => setDetails({...details, username: e.target.value})}/>
        <label className='mb-1 self-start'>Password</label>
        <input className='w-full mb-6' type='password' onChange={(e) => setDetails({...details, password: e.target.value})}/>
        <button className='w-full bg-gradient-to-r from-sky-700 to to-cyan-700 mb-10'>Login</button>
        <span className='text-zinc-700 text-sm'>
          Don't have an account? <Link className='text-zinc-600 text-sm rounded-md font-bold' to={'/signup'}>Sign up</Link>
        </span>
      </form>
    </div>
  )
}

export default Login
