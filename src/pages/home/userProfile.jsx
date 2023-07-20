import { useContext, useEffect, useRef, useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { TbPhotoEdit } from 'react-icons/tb'
import { FiEdit } from 'react-icons/fi'
import { LuView } from 'react-icons/lu'
import { homeContext } from './context/homecontext'
import { tabs } from './utils/tabs'
import { MdAlternateEmail } from 'react-icons/md'
import { IoMdExit } from 'react-icons/io'
import axios from 'axios'


function UserProfile() {

  const {setTab, curGroup, groups, setGroups, setUserDetails, userDetails, userProfileId, members} = useContext(homeContext)
  const [error, setError] = useState('')
  const [editProfile, setEditProfile] = useState(false)
  const [username, setUsername] = useState(userDetails.userid == userProfileId? userDetails.username : members?.[curGroup]?.[userProfileId]?.username)
  const [status, setStatus] = useState(userDetails.userid == userProfileId? userDetails.status : members?.[curGroup]?.[userProfileId]?.status)
  const [imageURL, setImageURL] = useState(userDetails.userid == userProfileId? userDetails.image : members?.[curGroup]?.[userProfileId]?.image)
  const uploadRef = useRef()

  useEffect(() => {
    setError('')
  }, [editProfile])

  const changeImage = async (e) => {
    setImageURL(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async () => {
    if (username.length > 1) {
      try {
        let formData = new FormData()
        formData.append('file', uploadRef.current.files[0])
        formData.append('details', JSON.stringify({username, status}))
        const response = await axios.post('/user/edit', formData, {headers: {'Content-Type': 'multipart/form-data'}})
        const temp = Object.assign({}, userDetails)
        temp.username = username
        temp.status = status
        temp.image = response.data.newimage || temp.image
        setUserDetails(temp)
        setEditProfile(false)
      }
      catch (err) {
        setError(err.response.data.message)
      }
    }
    else {
      setError('Enter a username.')
    }
  }

  const handleLogout = async () => {
    try {
      await axios.get('/user/logout')
      window.location.href = '/'
    }
    catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <div className='min-h-full bg-zinc-900 rounded-md px-4 pt-4 pb-16 flex flex-col items-center'>
      <div className='w-full flex justify-end mb-20'>
        <button className='text-zinc-600 border-2 text-lg border-zinc-600 p-2 rounded-full hover:text-zinc-300 hover:border-zinc-300' onClick={() => setTab(tabs.HOME)}>
          <RiCloseLine/>
        </button>
      </div>
      <div className='flex flex-col w-80 max-w-full'>
        <span className='mb-1 font-bold text-2xl'>User profile</span>
        <span className='mb-2 text-xs text-zinc-500'>View user details.</span>
        {
          !editProfile && userDetails.userid == userProfileId &&
          <button className='flex items-center self-end mb-2 text-sm text-zinc-500 hover:text-zinc-300' onClick={() => setEditProfile(true)}>
            <span className='mr-1'>Edit profile</span>
            <FiEdit/>
          </button>
        }
        {
          editProfile &&
          <button className='flex items-center self-end mb-2 text-sm text-zinc-500 hover:text-zinc-300' onClick={() => setEditProfile(false)}>
            <span className='mr-1'>View details</span>
            <LuView/>
          </button>
        }
        <div className='text-red-400 text-sm w-full h-8 mb-4 flex items-end'>{error}</div>
        {
          editProfile &&
          <>
            <div className='relative w-24 h-24 rounded-full mb-4 border-2 border-zinc-600 text-zinc-400 overflow-hidden'>
              <input ref={uploadRef} accept="image/*" className='hidden' type='file' onChange={changeImage}></input>
              <button className='w-full h-full absolute top-0 left-0 p-0 bg-black opacity-0 hover:opacity-70 focus:opacity-70 flex justify-center items-center' onClick={() => uploadRef.current.click()} onMouseDown={(e) => e.preventDefault()}>
                Edit <TbPhotoEdit className='ml-1'/>
              </button>
              <img src={imageURL} className='w-full h-full object-cover'></img>
            </div>
            <label className='mb-1'>Username</label>
            <input className='mb-4' value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <label className='mb-1'>Status</label>
            <input className='w-full mb-6' maxLength={64} value={status} onChange={(e) => setStatus(e.target.value)}></input>
            <button className='w-full mb-4 bg-gradient-to-r from-sky-700 to to-cyan-700' onClick={handleSubmit}>Save</button>
            <button className='flex items-center self-end text-sm text-red-400 hover:text-red-500' onClick={handleLogout}>
              <span className='mr-1'>Logout</span>
              <IoMdExit/>
            </button>
          </>
        }
        {
          !editProfile &&
          <>
            <div className='relative w-24 h-24 rounded-full mb-4 border-2 border-zinc-600 text-zinc-400 overflow-hidden'>
              <img src={imageURL} className='w-full h-full object-cover'></img>
            </div>
            <div className='w-full flex items-center mb-2'>
              <MdAlternateEmail className='text-zinc-500 mr-1'/>
              <span>{userDetails.userid == userProfileId? userDetails.username : members?.[curGroup]?.[userProfileId]?.username}</span>
            </div>
            <span className='w-full mb-6 text-sm text-zinc-300 whitespace-pre-line'>{userDetails.userid == userProfileId? userDetails.status : members?.[curGroup]?.[userProfileId]?.status}</span>
          </>
        }
      </div>
    </div>
  )
}

export default UserProfile
