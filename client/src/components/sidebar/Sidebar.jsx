import { Link } from 'react-router-dom'
import './sidebar.css'
import { FaFacebookSquare, FaInstagramSquare, FaPinterestSquare, FaTwitterSquare } from "react-icons/fa";
import { useEffect, useState } from 'react';
import axios from 'axios';
const url = 'http://localhost:3000/api/v1'

const Sidebar = () => {

    const [category, setCategory] = useState([])

    useEffect(() => {
        const getCategory = async () => {
            const res = await axios.get(url + '/getAllCategory')
            setCategory(res.data['data'])
        }
        getCategory()
    }, [])
    


  return (
    <>
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT US</span>
                <img src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                <p>
                    Laboris sunt aute cupidatat velit magna velit ullamco dolore mollit
                    amet ex esse.Sunt eu ut nostrud id quis proident.
                </p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORY</span>
                <ul className="sidebarList">
                    {category.map((item, i) => (
                        <li className="sidebarListItem" key={i}><Link className='link' to={`/?cat=${item.name}`}>{item.name}</Link></li>
                    ))}
                </ul>
                
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <FaFacebookSquare className="sidebarIcon" />
                    <FaInstagramSquare className="sidebarIcon" />
                    <FaPinterestSquare className="sidebarIcon" />
                    <FaTwitterSquare className="sidebarIcon" />
                </div>
            </div>
        </div>
    </>
  )
}

export default Sidebar