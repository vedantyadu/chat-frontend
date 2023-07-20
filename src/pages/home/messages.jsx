import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { homeContext } from './context/homecontext'
import { FiSend } from 'react-icons/fi'
import { socket } from '../../socket/socket'
import MessageCard from './messageCard'
import axios from 'axios'

function Messages() {

  const {messages, setMessages, curGroup, setCurGroup} = useContext(homeContext)

  const [message, setMessage] = useState('')
  const [shiftKey, setShiftKey] = useState(false)
  const messageInputRef = useRef()
  const messageDivRef = useRef()
  const [scroll, setScroll] = useState(false)

  const scrollDown = () => {
    if (messageDivRef.current) {
      messageDivRef.current.scrollTop = messageDivRef.current.scrollHeight
    }
  }

  const sendMessage = async () => {
    try {
      setMessage('')
      await axios.post('/message/create', {groupid: curGroup, message})
    }
    catch (err) {

    }
  }

  const setSize = (e) => {
    if (e.nativeEvent.inputType == "insertLineBreak" && !shiftKey && e.target.value) {
      sendMessage()
    }
    else {
      const limit = 200
      messageInputRef.current.style.height = ""
      messageInputRef.current.style.height = Math.min(messageInputRef.current.scrollHeight, limit) + "px"
      messageInputRef.current.scrollTop = messageInputRef.current.scrollHeight
      setMessage(e.target.value)
    }
  }

  const keyDown = (e) => {
    if (e.shiftKey) {
      setShiftKey(true)
    }
  }

  const keyUp = (e) => {
    if (e.shiftKey) {
      setShiftKey(false)
    }
  }

  useEffect(() => {
    const getMessages = async () => {
      const response = await axios.get(`/message/data/${curGroup}`)
      setMessages({...messages, [curGroup]: response.data.messages})
      setScroll(true)
    }
    if (curGroup && !messages[curGroup]) {
      getMessages()
    }
    setScroll(true)
  }, [curGroup])

  useEffect(() => {
    if (scroll) {
      scrollDown()
      setScroll(false)
    }
  }, [scroll])

  return (
    <>
      {
        curGroup && messages?.[curGroup] &&
        <div className='w-full flex flex-col flex-1 bg-zinc-900 rounded-md p-2 justify-end overflow-hidden'>
              <div className='w-full flex-1 mb-2 p-2 overflow-auto flex flex-col' ref={messageDivRef}>
                {
                  messages?.[curGroup] &&
                  messages[curGroup].map((message, i) => {
                    return <MessageCard key={i} details={message} index={i}/>
                  })
                }
              </div>
              <div className='flex bg-zinc-800 rounded-md px-1'>
                <textarea className='flex-1 mr-2 px-2' ref={messageInputRef} rows={1} value={message} onInput={setSize} onKeyUp={keyUp} onKeyDown={keyDown}></textarea>
                <div className='h-full flex py-1'>
                  <button className='w-8 h-8 flex items-center justify-center bg-gradient-to-r from-sky-700 to to-cyan-700 text-lg' onClick={sendMessage}>
                    <FiSend/>
                  </button>
                </div>
              </div>
        </div>
      }
      {
        curGroup && !messages?.[curGroup] &&
        <div className='w-full overflow-auto flex-1 bg-zinc-900 rounded-md p-2'></div>
      }
      {
        !curGroup && !messages?.[curGroup] &&
        <div className='w-full overflow-auto flex-1 bg-zinc-900 rounded-md p-2 opacity-60'></div>
      }
    </>
  )
}

export default Messages
