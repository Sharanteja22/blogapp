import React,{useContext,useEffect} from 'react'
import { userContextObj } from '../../contexts/userContext'
import {useUser} from '@clerk/clerk-react'
import axios from 'axios'
function Home() {

  const {currentUser,setCurrentUser}=useContext(userContextObj);
  const {isSignedIn,user,isLoaded}=useUser();

  async function onSelectRole(event){
      const role=event.target.value;
      currentUser.role=role;
      let res=null;
      if(role=='author'){
          res=await axios.post('http://localhost:3000/author-api/user',currentUser);
          let {message,payload}=res.data;
          if(message=='author'){
              setCurrentUser({...currentUser,...payload});
              console.log("created succefully")
          }else{
            console.log("error in creating author")
          }
      }
      if(role=='user'){
          res=await axios.post('http://localhost:3000/user-api/user',currentUser);
          let {message,payload}=res.data;
          if(message=='user'){
              setCurrentUser({...currentUser,...payload});
          }else{
            console.log("error in creating user")
          }
      }
  }
  
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
    <div className='container bg-secondary p-2 rounded'>
      {
        !isSignedIn && <div>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam a ea aut asperiores sequi explicabo vero eum optio, assumenda quod?</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam a ea aut asperiores sequi explicabo vero eum optio, assumenda quod?</p>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam a ea aut asperiores sequi explicabo vero eum optio, assumenda quod?</p>
        </div>
      }
      {
        isSignedIn && 
        <div>
          <div>
            <p className="display-5 text-center text-light ">{user.fullName}</p>
          </div>
          <div className='d-flex  justify-content-evenly bg-secondary w-75 mx-auto'>

            <div className="form-check ">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="roleAdmin"
                value="admin"
                onChange={onSelectRole}
              />
              <label className="form-check-label" htmlFor="roleAdmin">
                Admin
              </label>
            </div>

            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="role"
                id="roleAuthor"
                value="author"
                onChange={onSelectRole}
              />
              <label className="form-check-label" htmlFor="roleAuthor">
                Author
              </label>
            </div>

            <div className="form-check">
              <input className="form-check-input"
                type="radio"name="role" id="roleUser" value="user" onChange={onSelectRole}
              />
              <label className="form-check-label" htmlFor="roleUser">User</label>
            </div>
          </div>

        </div>
      }
    </div>
  )
}

export default Home