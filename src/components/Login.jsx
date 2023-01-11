 
 import React from 'react'
 import { useEffect } from 'react'
 import GoogleLogin from 'react-google-login'
 import { useNavigate } from 'react-router-dom'
 import {FcGoogle} from 'react-icons/fc'
 import shareVideo from '../assets/share.mp4'
 import logo from '../assets/logowhite.png'
 import { loadGapiInsideDOM } from "gapi-script";
 import {client} from '../client'

 const Login = () => {

  useEffect(() => { // Async. Javascript
    (async () => {// Immediately invoked function
      await loadGapiInsideDOM();
    })();
  });
  const navigate = useNavigate()
  const responseGoogle = (response)=>{
        localStorage.setItem('user', JSON.stringify(response.profileObj))
        const {name, googleId, imageUrl} = response.profileObj
        // we want to create a new Sanity document for the user and that user is gonna be saved to the DB.
        // The schema is as follows:
        const doc = { // Needs to be connected the user schema in Sanity.
          _id:googleId,
          _type: 'user',
          userName:name,
          image: imageUrl,
        }

        client.createIfNotExists(doc)
        .then(()=>{ // Now, if our response Google is successful we should get directed back to our localhost 3000 and our user should be created in sanity's dashboard
            navigate('/', {replace:true})
        })
  }

   return (
     <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative w-full h-full'>
              <video 
                src={shareVideo}
                type='video/mp4'
                loop
                controls={false}
                muted
                autoPlay
                className='w-full h-full object-cover'
              />
              <div className='absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-blackOverlay'>
                  <div className='p-5'>
                    <img src={logo} width='130px' alt='logo' />
                  </div>
                  <div className='shadow-2x1'>
                    <GoogleLogin
                      clientId='825031796378-s0h3t129f5hftilojnepliki9u6fe0m8.apps.googleusercontent.com'
                      render={(renderProps)=>(
                        <button 
                          type='button'
                          className='bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
                          onClick={renderProps.onClick}
                          disabled={renderProps.disabled}
                        >
                          <FcGoogle className='mr-4' /> Sign in with Google
                        </button>
                      )}
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy="single_host_origin"
                    />
                  </div>
              </div>
        </div>
     </div>
   )
 }
 
 export default Login