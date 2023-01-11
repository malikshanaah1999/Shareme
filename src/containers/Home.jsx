import React, {useEffect, useRef, useState} from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link, Route, Routes} from 'react-router-dom'
import {SideBar, UserProfile} from '../components'
import { client } from '../client'
import logo from '../assets/logo.png'
import Pins from './Pins'
import {userQuery} from '../utils/data'
import {fetchUser} from '../utils/fetchUser'

const Home = () => {
const [toggleSideBar, setToggleSideBar] = useState(false)
const [user, setUser] = useState(null)
const scrollRef = useRef(null)
const userInfo = fetchUser()
useEffect(()=>{ // A sanity querey in which it will fetch the user info from Sanity content platform
    const query = userQuery(userInfo?.googleId)
    client.fetch(query)
    .then((data)=>{
      setUser(data[0])
    })
},[])
useEffect(() => {
  scrollRef.current.scrollTo(0, 0) // to deactivate the scrollBar
}, [])


  return (
    // A slight animation as our div loads....
    <div className='flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out'>
        <div className='hidden md:flex h-screen flex-initial'>
              <SideBar user={user && user} />
        </div>
        <div className='flex md:hidden flex-row'>
          <div className='p-2 w-full flex flex-row justify-between items-center shadow-md'>
              <HiMenu fontSize={50} className="cursor-pointer" onClick={()=>setToggleSideBar(true)} />
                <Link to='/'>
                    <img src={logo} alt='logo' className='w-28' />
                </Link>
                <Link to={`user-profile/${user?._id}`}>
                    <img src={user?.image} alt='logo' className='w-18' />
                </Link>
          </div>
          {toggleSideBar && (
          <div className='fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in'>
              <div className='absolute w-full flex justify-end items-center p-2'>
                  <AiFillCloseCircle fontSize={34} className='cursor-pointer'onClick={()=>setToggleSideBar(false)} />
              </div>
              <SideBar user={user && user} closeToggle={setToggleSideBar} /> 
          </div>
        )}
           
        </div>
        
        <div className='pb-2 flex-1 h-screen overflow-y-scroll' ref={scrollRef}> 
            <Routes>
                <Route path='/user-profile/:userId' element={<UserProfile/>} /> 
                <Route path='/*' element={<Pins user={user && user}/>} /> 
            </Routes>
        </div>
    </div>
  )
}
// user={user && user}: Means that if the User exists then pass the user, else simply pass false
//toggleSideBar &&....:Means that if you toggle it the sidebar will be animate in.
// :userId -> Means that it'll be dynamic 
export default Home