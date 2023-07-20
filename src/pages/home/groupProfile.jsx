import { useContext, useRef, useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { TbPhotoEdit } from 'react-icons/tb'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit } from 'react-icons/fi'
import { LuView } from 'react-icons/lu'
import { homeContext } from './context/homecontext'
import { tabs } from './utils/tabs'
import { MdAlternateEmail } from 'react-icons/md'
import { IoMdExit } from 'react-icons/io'
import axios from 'axios'


function GroupProfile() {

  const {setTab, curGroup, groups, setGroups, setCurGroup} = useContext(homeContext)
  const [error, setError] = useState('')
  const [editGroup, setEditGroup] = useState(false)
  const [groupName, setGroupName] = useState(groups[curGroup].name)
  const [description, setDescription] = useState(groups[curGroup].description)
  const [imageURL, setImageURL] = useState(groups[curGroup].image)
  const uploadRef = useRef()

  const changeImage = async (e) => {
    setImageURL(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async () => {
    if (groupName.length > 0) {
      try {
        let formData = new FormData()
        formData.append('file', uploadRef.current.files[0])
        formData.append('details', JSON.stringify({groupname: groupName, id: curGroup, description: description}))
        const response = await axios.post('/group/edit', formData, {headers: {'Content-Type': 'multipart/form-data'}})
        const temp = Object.assign({}, groups)
        if (response.data.newimage) {
          temp[curGroup].image = response.data.newimage
        }
        temp[curGroup].name = groupName
        temp[curGroup].description = description
        setGroups(temp)
        setEditGroup(false)
      }
      catch (err) {
        setError(err.response.data.message)
      }
    }
    else {
      setError('Enter a group name.')
    }
  }

  const handleDelete = async () => {
    try {
      const response = await axios.post('/group/delete', {id: curGroup})
      const temp = Object.keys({}, groups)
      delete temp[curGroup]
      setCurGroup(Object.keys(temp)[0])
      setGroups(temp)
      setTab(tabs.HOME)
    }
    catch (err) {
      setError(err.response.data.message)
    }
  }

  const handleLeave = async () => {
    try {
      await axios.post('/group/leave', {id: curGroup})
      const temp = Object.assign({}, groups)
      delete temp[curGroup]
      setCurGroup(Object.keys(temp)[0])
      setGroups(temp)
      setTab(tabs.HOME)
    }
    catch (err) {
      setError(err.resposne.data.message)
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
        <span className='mb-1 font-bold text-2xl'>Group profile</span>
        <span className='mb-2 text-xs text-zinc-500'>View group details.</span>
        {
          !editGroup && groups[curGroup].admin &&
          <button className='flex items-center self-end mb-2 text-sm text-zinc-500 hover:text-zinc-300' onClick={() => setEditGroup(true)}>
            <span className='mr-1'>Edit profile</span>
            <FiEdit/>
          </button>
        }
        {
          editGroup &&
          <button className='flex items-center self-end mb-2 text-sm text-zinc-500 hover:text-zinc-300' onClick={() => setEditGroup(false)}>
            <span className='mr-1'>View details</span>
            <LuView/>
          </button>
        }
        <div className='text-red-400 text-sm w-full h-8 mb-4 flex items-end'>{error}</div>
        {
          editGroup &&
          <>
            <div className='relative w-24 h-24 rounded-full mb-4 border-2 border-zinc-600 text-zinc-400 overflow-hidden'>
              <input ref={uploadRef} accept="image/*" className='hidden' type='file' onChange={changeImage}></input>
              <button className='w-full h-full absolute top-0 left-0 p-0 bg-black opacity-0 hover:opacity-70 focus:opacity-70 flex justify-center items-center' onClick={() => uploadRef.current.click()} onMouseDown={(e) => e.preventDefault()}>
                Edit <TbPhotoEdit className='ml-1'/>
              </button>
              <img src={imageURL} className='w-full h-full object-cover'></img>
            </div>
            <label className='mb-1'>Group name</label>
            <input className='mb-4' value={groupName} onChange={(e) => setGroupName(e.target.value)}></input>
            <label className='mb-1'>Group description</label>
            <textarea className='w-full mb-6' maxLength={256} value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            <button className='w-full mb-4 bg-gradient-to-r from-sky-700 to to-cyan-700' onClick={handleSubmit}>Save</button>
            <button className='flex items-center self-end text-sm text-red-400 hover:text-red-500' onClick={handleDelete}>
              <span className='mr-1'>Delete group</span>
              <AiOutlineDelete/>
            </button>
          </>
        }
        {
          !editGroup &&
          <>
            <div className='relative w-24 h-24 rounded-full mb-4 border-2 border-zinc-600 text-zinc-400 overflow-hidden'>
              <img src={imageURL} className='w-full h-full object-cover'></img>
            </div>
            {
              curGroup &&
              <div className='w-full flex items-center mb-2'>
                <MdAlternateEmail className='text-zinc-500 mr-1'/>
                <span>{groups?.[curGroup]?.name}</span>
              </div>
            }
            <span className='w-full mb-6 text-sm text-zinc-300 whitespace-pre-line'>{groups[curGroup].description}</span>
            <button className='flex items-center self-end text-sm text-red-400 hover:text-red-500' onClick={handleLeave}>
              <span className='mr-1'>Leave group</span>
              <IoMdExit/>
            </button>
          </>
        }
      </div>
    </div>
  )
}

export default GroupProfile
