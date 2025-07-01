import React,{useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import { useClerk, useUser } from '@clerk/clerk-react'
import { userContextObj } from '../../contexts/userContext'
function Header() {

  const { signOut } = useClerk();
  const {currentUser,setCurrentUser}=useContext(userContextObj);
  const {isSignedIn,user,isLoaded}=useUser();
  const navigate = useNavigate();
  console.log({isSignedIn,user,isLoaded,currentUser})
  //function to signout
  async function handleSignOut() {
    await signOut();
    setCurrentUser(null);
    navigate('/'); 
  }


  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light px-2 header">
        <Link class="navbar-brand" to="">LOGO</Link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <Link class="nav-link" to="">Home <span class="sr-only">(current)</span></Link>
            </li>
            {
              !isSignedIn?
              <>
                <li class="nav-item active">
                  <Link class="nav-link" to="signin">Login</Link>
                </li> <li class="nav-item active">
                  <Link class="nav-link" to="signup">Register</Link>
                </li>
              </>
              :
              <div>
                  <button className="btn btn-danger" onClick={handleSignOut}>Sign Out</button>
              </div>
            }
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Header