import './home.css'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
const url = 'http://localhost:3000/api/v1'

const Home = () => {

  const [posts, setPosts] = useState([])
  const {search} = useLocation()

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(url + '/FindAllPost' + search)
      setPosts(res.data['data'])
    }
    fetchPosts()
  }, [search])
  


  return (
    <>
        <Header />
        <div className="home">
          <Posts posts={posts} />
          <Sidebar />
        </div>
    </>
  )
}

export default Home