import { useContext, useEffect, useState } from 'react'
import { HomeContext } from '@/components/Home/context/HomeContext'
import MemberInfo from '@/components/Home/MemberInfo'

function useMembers() {
  const {curGroup, groupInfo, onlineUsers} = useContext(HomeContext)
  const online = []
  const offline = []

  if (groupInfo) {
    groupInfo[curGroup].members.map((member) => {
      onlineUsers[member].online? online.push(member): offline.push(member)
    })
  }
  return {online, offline, onlineUsers}
}

function Members() {
  
  const {online, offline, onlineUsers} = useMembers()

  return (
    <div className="flex-none w-64 flex flex-col p-4 bg-neutral-900 rounded-md text-white">
      <div className='w-full flex flex-col'>
        <span className='font-bold text-lg mb-4'>Members</span>
        <span className='text-neutral-600 text-xs font-bold mb-4'>ONLINE - {online.length}</span>
        {online.map((member) => <MemberInfo key={member} userinfo={onlineUsers[member]}/>)}
        <span className='text-neutral-600 text-xs font-bold mb-4'>OFFLINE - {offline.length}</span>
        {offline.map((member) => <MemberInfo key={member} userinfo={onlineUsers[member]}/>)}
      </div>
    </div>
  )
}

export default Members
