import React,{useState,useEffect} from 'react';
 import { logo } from '../../../Asset';
 import { BsLayoutSidebarInsetReverse } from "react-icons/bs";
 import { CgProfile } from "react-icons/cg";
import { Button } from 'react-bootstrap';
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from 'axios';
import './AdminNav.scss'
import { Link } from 'react-router-dom';
import { CiCircleList } from "react-icons/ci";
import { TbReport } from "react-icons/tb";
import { FcApproval } from "react-icons/fc";
import { SlLogin } from "react-icons/sl";
import { MdMenuOpen } from "react-icons/md";

const AdminNav = ({onLinkClick}) => {
 
  const [Profile, setProfile] = useState(false)
  const [Image, setImage] = useState([])
  const [Name, setName] = useState(null)
  const [Email, setEmail] = useState(null)
  const [Sidebar, setSidebar]=useState(false)
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
             console.log(response.data.User.Image)
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
  }) .then(res=>{
console.los(res)
  })
} catch (error) {
  console.log(error)
}
      
      }
     
  return (

    <section className="bg-primary-subtle NavStart" style={{zIndex:"10"}}>
        <div className="logo1"><img src={logo} alt="logo"  className="d-block mx-auto my-4 px-2 py-3 w-100 text-center text-lg-left img-fluid Logo shade"/></div>
       
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
 <div className="SideBarStart"><BsLayoutSidebarInsetReverse  onClick={()=>setSidebar(!Sidebar)}className="icon"/></div>
    
    {Sidebar && (
        <div className="bg-primary-subtle InSideBar">
            <h1 style={{textAlign:'center',fontSize:'1.5rem',background:'white',borderRadius:"20px"}}>Your DashBoard</h1>
           <div className="closinsidebar"  > <IoCloseCircleOutline  onClick={()=>setSidebar(!Sidebar)} className="icon"/></div>
        
        <div  className="Linkside">
            <p ><Link to="#"  onClick={()=>{ onLinkClick("Component2");setSidebar(!Sidebar)}} className="open-sans Paragraph"> <CiCircleList  className="m-2"/>Student List</Link></p>
            <p ><Link to="#"  onClick={()=>{ onLinkClick("Component1");setSidebar(!Sidebar)}} className="open-sans Paragraph"> <TbReport className="m-2" />Student Report</Link></p>
            <p  ><Link to="#"  onClick={()=>{ onLinkClick("Component3");setSidebar(!Sidebar)}} className="open-sans Paragraph" > <FcApproval className="m-2"/>Leave Aproval</Link></p>
             
            
        </div>
        </div>
    )

    }
    
    
    </section>
  )
}

export default AdminNav