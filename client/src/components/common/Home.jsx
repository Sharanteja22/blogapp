import React,{useContext,useEffect} from 'react'
import { userContextObj } from '../../contexts/userContext'
import {useUser} from '@clerk/clerk-react'

function Home() {

  const {currentUser,setCurrentUser}=useContext(userContextObj);
  const {isSignedIn,user,isLoaded}=useUser();

  useEffect(()=>{
    setCurrentUser({
      ...currentUser,
      firstName:user?.firstName,
      lastName:user?.lastName,
      email:user?.primaryEmailAddress?.emailAddress,
      profileImageUrl:user?.imageUrl 
    })
  },[isLoaded])

  return (
    <div>Home</div>
  )
}

export default Home