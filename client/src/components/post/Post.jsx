import { Link } from 'react-router-dom'
import './post.css'

const Post = ({post}) => {
  const PF = 'http://localhost:3000/uploads/'

  return (
    <>
        <div className="post">
          {post.photo && <img className='postImg' src={PF + post.photo} alt="photo" /> }
            
            <div className="postInfo" >
                <div className="postCats">
                  {post.categories.map((item) => (
                    <span className="postCat">{item.name}</span>
                  ))}
                </div>
                <Link to={`/post/${post._id}`} className='link'>
                  <span className="postTitle">{post.title}</span>
                </Link>
                <hr />
                <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
            </div>
            <p className="postDesc">{post.desc}</p>
        </div>
    </>
  )
}

export default Post