import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Topbar from './components/topbar/Topbar'
import Home from './pages/home/Home'
import Single from './pages/single/Single'
import Write from './pages/write/Write'
import Settings from './pages/settings/Settings'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Footer from './components/footer/Footer'


const App = () => {


  return (
    <>
      <Router>
        <Topbar/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/write' element={<Write />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/post/:postId' element={<Single />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
