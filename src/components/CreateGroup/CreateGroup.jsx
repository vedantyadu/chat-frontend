import axios from 'axios'
import { FiEdit } from 'react-icons/fi'
import { AiOutlinePlus } from 'react-icons/ai'
import { useState, useRef, useContext } from 'react'
import { HomeContext } from '@/components/Home/context/HomeContext'
import { homeTabs } from '@/components/Home/utils/tabs'

function useProfile() {

  const {defaultImage} = useContext(HomeContext)
  const uploadInputRef = useRef()
  const [imageUrl, setImageURL] = useState(defaultImage.current)
  const [details, setDetails] = useState({})
  const {setHomeTab} = useContext(HomeContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      let formData = new FormData()
      formData.append('file', uploadInputRef.current.files[0])
      formData.append('details', JSON.stringify(details))
      const response = await axios.post('/group/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      exit()
    }
    catch (err) {
      console.log(err)
    }
  }

  const selectImage = (e) => {
    setImageURL(URL.createObjectURL(e.target.files[0]))
  }

  const exit = () => {
    setHomeTab(homeTabs.MAIN)
  }

  return {selectImage, uploadInputRef, imageUrl, details, setDetails, handleSubmit, exit}
}

function CreateGroup() {

  const {selectImage, uploadInputRef, imageUrl, details, setDetails, handleSubmit, exit} = useProfile()
  
  return (
    <div className='flex flex-col items-center w-full h-full bg-neutral-900 rounded-md py-4'>
      <div className='w-full flex justify-end mb-20 mr-8'>
        <button type='button' className='text-neutral-600 text-2xl rotate-45 rounded-full p-2 border-2 border-neutral-600' onClick={exit}>
          <AiOutlinePlus/>
        </button>
      </div>
      <form className='flex flex-col w-80' onSubmit={handleSubmit}>
        <span className='w-full text-white font-bold text-4xl mb-8 text-left'>New group</span>
        <div className='relative mb-6 w-max'>
          <div onClick={() => uploadInputRef.current.click()} className='w-full border-neutral-500 text-neutral-500 border-2 h-full absolute top-0 left-0 rounded-full flex justify-center items-center opacity-0 hover:opacity-100 duration-200 transition-opacity cursor-pointer bg-black bg-opacity-70'>
            <span className='mr-1'>Edit</span>
            <span><FiEdit/></span>
          </div>
          <img className='h-24 w-24 rounded-full cursor-pointer object-cover' src={imageUrl}/>
        </div>
        <input ref={uploadInputRef} className='hidden' type='file' name='file' accept='image/*' onChange={selectImage}/>
        <label className='mb-1 text-sm text-neutral-600 w-full'>Group name</label>
        <input defaultValue={details.groupname} onChange={(e) => setDetails({...details, groupname: e.target.value})} className='p-2 mb-4'></input>
        <input className='mb-4' value='Create group' type='submit'/>
      </form>
    </div>
  )
}

export default CreateGroup
