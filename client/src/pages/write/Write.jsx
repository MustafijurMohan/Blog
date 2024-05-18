import { useContext, useState } from 'react';
import axios from 'axios'
import './write.css'
import { GoPlusCircle } from "react-icons/go";
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
const url = 'http://localhost:3000/api/v1'


const Write = () => {

    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState(null)
    const { user } = useContext(Context)
    const navigate = useNavigate()

    // Form Submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        const newPost = {
            username: user.username, title, desc
        }
        if(file) {
            const data = new FormData()
            const filename = file.name
            data.append('name', filename)
            data.append('file', file)
            newPost.photo = filename
            try {
                await axios.post( url + '/uploadImage', data)
            } catch (error) {
                console.log(error)
            }
        }
        try {
            const res = await axios.post(url + '/PostCreate', newPost)
            navigate('/post/' + res.data['data']._id)
        } catch (error) {
            console.log(error)
        }
    }



  return (
    <>
        <div className="write">
            {file && (
                <img className='writeImg' src={URL.createObjectURL(file)} alt="" />
            )}
            <form className='writeForm' onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <GoPlusCircle className='writeIcon' />
                    </label>
                    <input type="file" id='fileInput' onChange={(e) => setFile(e.target.files[0])} style={{display: 'none'}} />
                    <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder='Title' className='writeInput' autoFocus={true} />
                </div>
                <div className="writeFormGroup">
                    <textarea type='text' onChange={(e) => setDesc(e.target.value)} placeholder='Tell your story....' className='writeInput writeText' autoFocus={true} ></textarea>
                </div>
                <button type="submit" className='writeSubmit'>Publish</button>
            </form>
        </div>
    </>
  )
}

export default Write