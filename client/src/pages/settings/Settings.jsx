import { useContext, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './settings.css'
import { FaRegUserCircle } from "react-icons/fa";
import { Context } from '../../context/Context';
import axios from 'axios';

const Settings = () => {
    const url = 'http://localhost:3000/api/v1'
    const PF = 'http://localhost:3000/uploads/'

    const { user, dispatch } =  useContext(Context)

    const [file, setFile] = useState(null)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSuccess] = useState(false)

    // Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch({type: 'UPDATE_START'})

        const updatedUser = {
            userId: user._id, username, email, password
        }
        if(file) {
            const data = new FormData()
            const filename = file.name
            data.append('name', filename)
            data.append('file', file)
            updatedUser.profilePic = filename
            
            try {
                await axios.post('/uploadImage', data)
            } catch (error) {
                
            }
        }
        try {
            const res = await axios.post(url + '/UserUpdateByID/' + user._id , updatedUser)
            dispatch({type: 'UPDATE_SUCCESS', payload: res.data['data']})
        } catch (error) {
            dispatch({type: 'UPDATE_FAILOUR'})
        }
        
    }

  return (
    <>
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsTitleUpdate">Update Your Account</span>
                    <span className="settingsTitleDelete">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" />
                        <label htmlFor="fileInput">
                            <FaRegUserCircle className='settingsPPIcon' />
                        </label>
                        <input type="file" id='fileInput' onChange={(e) => setFile(e.target.files[0])} className='settingsPPInput' style={{display: 'none'}} />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)} name='name' />
                    <label>Email</label>
                    <input type="email"  placeholder={user.email} onChange={(e) => setEmail(e.target.value)} name='Email' />
                    <label>Password</label>
                    <input type="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} name='Password' />
                    <button type="submit" className='settingsSubmitButton'>Update</button>
                    {success &&(
                        <span style={{color: 'green', textAlign: 'center', marginTop:'20px'}} >Profile has been updated</span>
                    )}
                </form>
            </div>
            <Sidebar />
        </div>
    </>
  )
}

export default Settings