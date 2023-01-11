import React,{useState, useEffect} from 'react'
//To find out what is currently passed in parameters, with that we can find out what is the category is the person currently looking at.
import { useParams } from 'react-router-dom'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'
import { feedQuery, searchQuery } from '../utils/data'
const Feed = () => {
  const [loading, setLoading] = useState(false)
  const [pins, setPins] = useState(null)
  const {categoryId} = useParams()
  // the useEffect callback function will be called once categoryId changes
  useEffect(()=>{
    // As we are fetching the info(Posts), we need to set the loader to true
    setLoading(true)
    if(categoryId){// if we clicked a specific category, else it will show the Feed(All cat.s)
      // Setting-up a query from a specific user.
      const query = searchQuery(categoryId)
      client.fetch(query)
      .then((data)=>{
        setPins(data)
        setLoading(false)
      })
    }else{
      client.fetch(feedQuery)
      .then((data)=>{
        setPins(data)
        setLoading(false)
      })
    }
  }, [categoryId])
   //When you open your application! A spinner will be fired..with a msg passed as props
  if(loading) return <Spinner message='We are adding new ideas to you feed!' />

  if(!pins?.length) return <h2>No Pins Available</h2>
  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed