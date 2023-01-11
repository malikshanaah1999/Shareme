import React, {useState} from 'react'
import { Route, Routes } from 'react-router-dom'
import {Navbar, Feed, PinDetail, CreatePin, Search} from '../components'

// Go back to the bottom of the Home comp and see how we've passed {user} as props
const Pins = ({user}) => {
    const [searchTerm, setSearchTerm]= useState('')
    //Why do we create the searchTerm inside the pins comp. not in the Serach comp?
    //the ans: we need to share it across multiple comp.s which are Navbar and Search
  return (
    <div className='px-2 md:px-5'>
        <div className='bg-gray-50'>
            <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} />
        </div>
        <div className='h-full'>
            <Routes>
                <Route path='/' element={<Feed/>} />
                <Route path='/category/:categoryId' element={<Feed/>} />
                <Route path='/pin-detail/:pinId' element={<PinDetail user={user && user}/>} />
                <Route path='/create-pin' element={<CreatePin user={user}/>} />
                <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
            </Routes>
        </div>
    </div>
  )
}
// For the five Routes each of which has a shared comp. which is the NavBar.

export default Pins