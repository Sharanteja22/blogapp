import { useContext, useEffect, useState } from "react"
import { userContextObj } from "../../contexts/userContext"
import { useUser } from "@clerk/clerk-react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../styles/Home.css"

function Home() {
  const { currentUser, setCurrentUser } = useContext(userContextObj)
  const { isSignedIn, user, isLoaded } = useUser()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isLoaded && user) {
      setCurrentUser((prev) => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user?.primaryEmailAddress?.emailAddress,
        profileImageUrl: user.imageUrl,
      }))
    }
  }, [isLoaded])

  async function onSelectRole(event) {
    const role = event.target.value
    const updatedUser = { ...currentUser, role }
    setCurrentUser(updatedUser)
    setLoading(true)
    setError("")

    try {
      let res = null
      if (role === "author") {
        res = await axios.post("http://localhost:3000/author-api/user", updatedUser)
      } else if (role === "user") {
        res = await axios.post("http://localhost:3000/user-api/user", updatedUser)
      } else {
        setError("Admin role handling not implemented.")
        setLoading(false)
        return
      }

      const { message, payload } = res.data
      if (message === role) {
        setCurrentUser((prev) => ({ ...prev, ...payload }))
        setError("")
        navigate(`/${payload.role}-profile/${payload.email}`)
      } else {
        setError(message)
      }
    } catch (err) {
      console.error(err)
      setError("Network or server error occurred.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-100 d-flex justify-content-center align-items-center">
      <div className="w-100" style={{ maxWidth: "70%" }}>
        <div className="container home-container">
          {!isSignedIn && (
            <div className="welcome-section">
              <p className="signin-message">Please sign in to continue and explore our platform.</p>
            </div>
          )}

          {isSignedIn && (
            <>
              <div className="welcome-section">
                <p className="display-5 welcome-title">Welcome, {user.fullName}!</p>
              </div>

              <div className="role-selection-container">
                <div className="role-options">
                  {["admin", "author", "user"].map((role) => (
                    <div className={`role-option ${loading ? "loading" : ""}`} key={role} data-role={role}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="role"
                        id={`role-${role}`}
                        value={role}
                        onChange={onSelectRole}
                        disabled={loading}
                      />
                      <label className="form-check-label" htmlFor={`role-${role}`}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </label>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="error-message">
                    <p className="mb-0">{error}</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
