import { Link } from 'react-router-dom';
import './topbar.css'
import { FaFacebookSquare, FaInstagramSquare, FaPinterestSquare, FaTwitterSquare, FaSearch } from "react-icons/fa";
import { useContext } from 'react';
import { Context } from '../../context/Context';

const Topbar = () => {

   const { user, dispatch } = useContext(Context)
   const PF = 'http://localhost:3000/uploads/'

   const handleLogout = () => {
    dispatch({type: "LOGOUT"})
   }

  return (
    <>
        <div className="top">
            <div className="topLeft">
                <FaFacebookSquare className="topIcon" />
                <FaInstagramSquare className="topIcon" />
                <FaPinterestSquare className="topIcon" />
                <FaTwitterSquare className="topIcon" />
            </div>
            <div className="topCenter">
                <ul className='topList'>
                    <li className='topListItem'><Link className='link' to='/' >HOME</Link></li>
                    <li className='topListItem'><Link className='link' to='/write' >{user && 'WRITE'}</Link></li>
                    <li className='topListItem' onClick={handleLogout}>{user && 'LOGOUT'}</li>
                </ul>
            </div>
            <div className="topRight">
                {user ? 
                (
                    <Link to='/settings'>
                        <img className='topImg' src={PF + user.profilePic} alt="" />
                    </Link>
                )
                :
                (
                    <>
                        <ul className="topList">
                            <li className="topListItem"><Link className='link' to='/login' >LOGIN</Link></li>
                            <li className="topListItem"><Link className='link' to='/register' >REGISTER</Link></li>
                        </ul>
                    </>
                )
                }
                <FaSearch className="topSearchIcon" />
            </div> 
        </div>
        
    </>
  )
}

export default Topbar