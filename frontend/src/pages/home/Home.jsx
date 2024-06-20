import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import MessageContainer from '../../components/messages/MessageContainer'

const Home = () => {
  return (
    <div className='flex h-full w-full rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter bg-opacity-0' >
      <MessageContainer/>
      <span className='backdrop-blur-lg w-23'><Sidebar/></span>
    </div>
  )
}

export default Home;
