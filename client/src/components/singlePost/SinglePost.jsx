import { useContext, useEffect, useState } from 'react';
import './singlePost.css'
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Context } from '../../context/Context';



const SinglePost = () => {
    const url = 'http://localhost:3000/api/v1'
    const PF = 'http://localhost:3000/uploads/'

    const { user } = useContext(Context)
    const navigate = useNavigate()
    const location = useLocation()
    const path = location.pathname.split('/')[2]

    const [post, setPost] = useState({})
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [updateMode, setUpdateMode] = useState(false)

    useEffect(() => {
        const getSinglePost = async () => {
            const res = await axios.get(url + '/FindPostByID/' + path)
            setPost(res.data['data'])
            setTitle(res.data['data']['title'])
            setDesc(res.data['data']['desc'])
        }
        getSinglePost()
    }, [])
    
    // Delete Post
    const handleDelete = async (id) => {
        try {
            await axios.delete(url + `/PostDeleteByID/` + id, {
                data: {username: user.username}
            })
            navigate('/')
            
        } catch (error) {
            console.log(error)
        }
    }

    // Update Post
    const handleUpdate = async (id) => {
        try {
            await axios.post(url + `/UpdatePost/` +id, {
                username: user.username,
                title, desc
                })
                setUpdateMode(false)
                navigate(0)
                
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
        <div className="singlePost">
            <div className="singlePostWrapper">
                {post.photo && <img className='singlePostImg' src={PF + post.photo} alt="" /> }
                {updateMode ? (
                    <input type="text" className='singlePostTitleInput' value={title} onChange={(e) => setTitle(e.target.value)} />
                ) : (
                    <h1 className="singlePostTitle">{post.title}
                    {post.username === user.username && (
                        <div className="singlePostEdit">
                            <FaEdit className='singlePostIcon' onClick={() => setUpdateMode(true)}/>
                            <FaTrashAlt className='singlePostIcon' onClick={handleDelete.bind(this, post._id)} />
                        </div>
                    )}
                </h1>
                )}
                
                <div className="singlePostInfo">
                    <span>
                        Author:
                        <b className='singlePostAuthor'>
                            <Link className='link' to={`/?user=${post.username}`} >{post.username}</Link>
                        </b>
                    </span>
                    <span>{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? (
                    <textarea type='text' value={desc} onChange={(e) => setDesc(e.target.value)} className='singlePostDescInput' ></textarea>
                ) : (
                    <p className="singlePostDesc">{post.desc}</p>
                )}
                {updateMode && (
                    <button type="submit" className='singlePostButton' onClick={handleUpdate.bind(this, post._id)}>Update</button>
                )}
            </div>
        </div>
    </>
  )
}

export default SinglePost