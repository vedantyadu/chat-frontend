import axios from 'axios'
import { useContext, useEffect, useRef, useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'
import { TbPhotoEdit } from 'react-icons/tb'
import { urlToObject } from './utils/URLtoObject'
import { homeContext } from './context/homecontext'
import defaultIcon from '@/assets/default.jpeg'
import { tabs } from './utils/tabs'
import { socket } from '../../socket/socket'
import { DEFAULT_GROUP_IMAGE_URL } from './utils/defaultGroupURL'


function CreateGroup() {

  const {setTab, groups, setGroups, setCurGroup} = useContext(homeContext)
  const [error, setError] = useState()
  const [details, setDetails] = useState({})
  const [imageURL, setImageURL] = useState(DEFAULT_GROUP_IMAGE_URL)
  const uploadRef = useRef()

  const changeImage = (e) => {
    setImageURL(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async () => {
    if (!details.groupname || details.groupname.length < 1) {
      setError('Enter a group name.')
    }
    else {
      try {
        let formData = new FormData()
        formData.append('file', uploadRef.current.files[0])
        formData.append('details', JSON.stringify(details))
        const response = await axios.post('/group/create', formData, {headers: {'Content-Type': 'multipart/form-data'}})
        setTab(tabs.HOME)
      }
      catch (err) {
        if (err.response) {
          setError(err.response.data.message)
        }
        else {
          setError(err)
        }
      }
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
        <span className='mb-1 font-bold text-2xl'>Create a new group</span>
        <span className='mb-2 text-xs text-zinc-500'>Select an icon and enter a group name.</span>
        <div className='text-red-400 text-sm w-full h-8 mb-4 flex items-end'>{error}</div>
        <div className='relative w-24 h-24 rounded-full mb-4 border-2 border-zinc-600 text-zinc-400 overflow-hidden'>
          <input ref={uploadRef} className='hidden' type='file' onChange={changeImage}></input>
          <button className='w-full h-full absolute top-0 left-0 p-0 bg-black opacity-0 hover:opacity-70 focus:opacity-70 flex justify-center items-center' onClick={() => uploadRef.current.click()} onMouseDown={(e) => e.preventDefault()}>
            Edit <TbPhotoEdit className='ml-1'/>
          </button>
          <img src={imageURL} className='w-full h-full object-cover'></img>
        </div>
        <label className='mb-1'>Group name</label>
        <input className='w-full mb-4' onChange={(e) => setDetails({...details, groupname: e.target.value})}></input>
        <label className='mb-1'>Group description</label>
        <textarea className='w-full mb-6' maxLength={256} onChange={(e) => setDetails({...details, description: e.target.value})}></textarea>
        <button className='w-full bg-gradient-to-r from-sky-700 to to-cyan-700' onClick={handleSubmit}>Create</button>
      </div>
    </div>
  )
}

export default CreateGroup
