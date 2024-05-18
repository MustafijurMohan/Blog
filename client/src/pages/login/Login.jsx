import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './login.css'
import { useContext, useRef } from 'react'
import { Context } from '../../context/Context'

const url = 'http://localhost:3000/api/v1'

const Login = () => {

  const userRef = useRef()
  const passwordRef = useRef()
  const { dispatch, isFetching} = useContext(Context)
  const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault()
  dispatch({type: "LOGIN_START"})

  try {
    const res = await axios.post(url + '/login', {
      username: userRef.current.value,
      password: passwordRef.current.value,
    })
    dispatch({type: "LOGIN_SUCCESS", payload: res.data['data']})
    navigate('/')
  } catch (error) {
    dispatch({type: "LOGIN_FAILURE"})
  }
}

  return (
    <>
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className='loginForm' onSubmit={handleSubmit}>
                <label>Username</label>
                <input type="text" ref={userRef} className='loginInput' placeholder='Enter your username....' />
                <label>Password</label>
                <input type="password" ref={passwordRef} className='loginInput' placeholder='Enter your password....' />
                <button type="submit" className='loginButton' disabled={isFetching}>Login</button>
            </form>
            <button className='loginRegisterButton'><Link className='link' to='/register'>Register</Link></button>
        </div>
    </>
  )
}

export default Login