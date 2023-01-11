import React, {useState, useEffect} from 'react'
import MasonryLayout from './MasonryLayout'
import { client } from '../client'
import {feedQuery, searchQuery} from '../utils/data'
import Spinner from './Spinner'

const Search = ({searchTerm}) => {// searchTerm: Search you type
  const [pins, setPins] = useState(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (searchTerm) {// if I have inserted something...
      setLoading(true)
      const query = searchQuery(searchTerm.toLowerCase())
      client.fetch(query)
      .then((data) => {
        setPins(data)
        setLoading(false)
      })
    } else {
      client.fetch(feedQuery)
      .then((data) => {
        setPins(data)
        setLoading(false)
      })
    }
  }, [searchTerm]);

// i.e. if we search for something and don't have any pin and not currently loading ...{pins?.length === 0 && searchTerm === '' } 
  return (
    <div>
         {loading && <Spinner message='Searching for Pins.....' />}
         {pins?.length !== 0 && <MasonryLayout pins={pins} />}
         {pins?.length === 0 && searchTerm !== '' && !loading && (
          <div className="mt-10 text-center text-xl ">No Pins Found!</div>
         )} 
    </div>
  )
}

export default Search