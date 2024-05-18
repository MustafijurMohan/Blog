import { Link, useNavigate } from 'react-router-dom'
import './register.css'
import axios from 'axios'
import { useState } from 'react'
const url = 'http://localhost:3000/api/v1'

const Register = () => {

  const [user, setUser] = useState({username: '', email:'', password: ''})
  const navigate = useNavigate()

  // Input Handler
  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    setUser((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(url + '/register', user)
      
      res.data['data'] && navigate('/login')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
        <div className="register">
            <span className="registerTitle">Register</span>
            <form className='registerForm' onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" className='registerInput' onChange={handleInput} name='username' value={user.username} placeholder='Enter your username...' />
                <label>Email</label>
                <input type="email" className='registerInput' onChange={handleInput} name='email' value={user.email} placeholder='Enter your email...' />
                <label>Password</label>
                <input type="password" className='registerInput' onChange={handleInput} name='password' value={user.password} placeholder='Enter your Password....' />
                <button type="submit" className='registerButton' >Register</button>
            </form>
            <button className='registerLoginButton'><Link className='link' to='/login'>Login</Link></button>
        </div>
    </>
  )
}

export default Register