import React,{useState,useEffect} from 'react';
 import { logo } from '../../../Asset';
 import './Nav.scss'
 import { CgProfile } from "react-icons/cg";
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { FaCircleArrowLeft } from "react-icons/fa6";
import { MdMenuOpen } from "react-icons/md";
 

const Nav = ({onLinkClick}) => {
 
  const [Profile, setProfile] = useState(false)
  const [Image, setImage] = useState([])
  const [Name, setName] = useState(null)
  const [Email, setEmail] = useState(null)
    const formatDate = (date) => {
        const options = { weekday: 'long', month: 'numeric', year: 'numeric', day: 'numeric' };
        return  new Date(date).toLocaleDateString('en-US',options);
      };
      const day = new Date();
    const formattedDate= formatDate(day)
     
    useEffect(() => {
  
      const Authentication = async () => {
         // Hook for navigation
        try {
            // Make the GET request with credentials
            const response = await axios.get('http://localhost:5050/User/Cookies', {
                withCredentials: true, // Ensure cookies are sent with the request
            });
            
            if (response.data) {
              // If session is valid, update state and navigate to dashboard
              setImage(response.data.User.Image);
              setName(response.data.User.User)
              setEmail(response.data.User.Email)
           
          }  
        } catch (error) {
        
        }
      };
        Authentication()
      }, [])


      //LogoutFunction
      const handleLogOut = async()=>{

try {
  await axios.post('http://localhost:5050/User/Logout',{
    withCredentials: true,
  }) .then(response=>{
     
   
    
  })
} catch (error) {
  console.log(error)
}
      
      }
     
  return (

    <section className="bg-primary-subtle NavStart" style={{zIndex:"10"}}>
        <div className="logo1"><img src={logo} alt="logo"  className="d-block mx-auto my-4 px-2 py-3 w-100 text-center text-lg-left img-fluid Logo shade"/></div>
      <div className="NavbarBack"> <FaCircleArrowLeft className="icons" onClick={()=>onLinkClick('Component1')}/></div>
      <div className="sm_Menu"><MdMenuOpen className="icon"/></div> 
        <div className="RightNav">

<div className="date">  {formattedDate}</div>
<div className="Profile"><CgProfile  onClick={()=>setProfile(!Profile)} className="icon"/> 
   
    {Profile && (
  <div className="ProfileDiv">
    <div className="InProfile">
    <img src={`http://localhost:5050${Image.path}`} alt={Image.fileName} className="mt-2"/> 
    <p style={{display:'flex',fontSize:'13px',flexDirection:'column',margin:"7px"}}> <span>Name:</span><span>{Name}</span></p>
    <p style={{display:'flex',fontSize:'13px',flexDirection:'column',margin:"7px"}}><span>Email:</span><span>{Email}</span></p>
  
  </div>
  <div className="ProfileButton">  <Button className="m-1">Edit</Button>
    <Button className="m-1" onClick={handleLogOut}>LogOut</Button>
    </div>
    </div>
 
)}
 </div>

    </div>
    </section>
  )
}

export default Nav