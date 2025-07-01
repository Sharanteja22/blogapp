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
  //function to signout
  async function handleSignOut() {
    await signOut();
    setCurrentUser(null);
    navigate('/'); 
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light px-2 header">
        <Link className="navbar-brand" to="">LOGO</Link>
        {/* <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button> */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="">Home </Link>
            </li>
            {
              !isSignedIn?
              <>
                <li className="nav-item active">
                  <Link className="nav-link" to="signin">Login</Link>
                </li> <li className="nav-item active">
                  <Link className="nav-link" to="signup">Register</Link>
                </li>
              </>
              :
              <div className='d-flex justify-content-center align-items-center px-2' style={{gap:"10px"}}>
                  <div>
                    <img src="{user.imageUrl}" width="40px" alt="USER" className='rounded-circle' />
                    <div className='d-flex ' style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
                      <p >{user.firstName}</p>
                      <p>({currentUser.role})</p>
                    </div>
                  </div>
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