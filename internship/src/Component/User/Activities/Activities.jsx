import React, { useState,useEffect } from 'react'
import { Button, Table } from 'react-bootstrap';
import {Tilt} from "react-tilt";

import "./Activities.scss"
import { Navigation,EffectCoverflow, Pagination  } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import axios from 'axios';

const Activities = ({onLinkClick}) => {
   const [Name, setName] = useState(null)
   const [Email, setEmail] = useState(null)
   const formatDate = (date) => {
    const options = { weekday: 'long', month: 'numeric', year: 'numeric', day: 'numeric' };
    return  new Date(date).toLocaleDateString('en-US',options);
  };
  const day = new Date();
const formattedDate= formatDate(day)
 const [attendency, setattendency] = useState([{
  Todaysdate :formattedDate,
  Status:""
 }])

 


//function gettig the cookies 
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
          setName(response.data.User.User)
          setEmail(response.data.User.Email)
      }  
    } catch (error) {
     console.log(error)
    }
  };
    Authentication()
  }, [])


  const markAttendance = () => {
    setattendency((prev) =>
      prev.map((record) =>
        record.Todaysdate === formattedDate ? { ...record, Status: "Present" } : record
      )
    );
    Sendingattendency( formattedDate,"Present")
  };

  //function sending the data to the backend

  const Sendingattendency = async (date,Status)=>{
if(!Email){
  console.log("no email")
  return
}
const payload = {
  Email,            // Sending the email directly
  Todaysdate: date, // Sending the date (formatted date)
  Status: Status,   // Sending the status (e.g., Present)
};
    await axios.post("http://localhost:5050/User/Data",payload ,{
      headers:{
        "Content-Type":"application/json"
      }
    }).then(res=>{
      console.log(res)
    })
    .catch(error=>{
      console.log(error)
    })
   }
  //fuunction that will help to change the state
  
  
  
  
  return (
    <section style={{width:"100%"}}>
        <div style={{margin:'3rem'}}><p className="open-sans text">Hello {Name} You welcome to your DashBoard</p></div>
       
 <Swiper
 effect={"coverflow"}
 grabCursor={true}
 centeredSlides={true}
 loop={true}
 slidesPreview={'auto'}
 coverflowEffect={{
  rotate :0,
  stretch:0,
  depth:100,
  modifier:2.5,
 }}
 
 pagination={{el:'',clickable:true}}
navigation={{
  nextEl:'next',
  preEl:'pre',
  clickable:true
}}
 modules={[Navigation, Pagination,EffectCoverflow]}
  className="bg-primary-subtle container">
      
    
       
        <SwiperSlide>   <Tilt
    options={{
      max:45,
      scale:1,
      speed:450,
    }} className="bg-primary-subtle" style={{width:"70%",justifyContent:'center',boxShadow:'1px 1px 2px 2px black',margin:'auto',borderRadius:'20px', height:'50%'}}>
       
       
          
        <div  className="tilt" style={{justifyContent:"space-between",alignItems:"center",display:"flex",flexDirection:"column",marginTop:"3rem" }}  >
<p className="open-sans text">Please click the button to view your attendency</p>
            <Button onClick={()=>onLinkClick('Component2')}>View</Button>
 
        </div> 
        </Tilt></SwiperSlide>
        <SwiperSlide>   <Tilt
    options={{
      max:45,
      scale:1,
      speed:450,
    }} className="bg-primary-subtle"  style={{width:"70%", boxShadow:'1px 1px 2px 2px black',justifyContent:'center',margin:'auto',borderRadius:'20px', height:'50%'}}>
       
      
          
        <div  className="tilt" style={{justifyContent:"space-between",alignItems:"center",display:"flex",flexDirection:"column",marginTop:"3rem" }}  >
<p className="open-sans text">Please click button for leave request</p>
            <Button onClick={()=>onLinkClick('Component3')}>Leave</Button>
        </div> 
        </Tilt></SwiperSlide>
        <SwiperSlide>   <Tilt
    options={{
      max:45,
      scale:1,
      speed:450,
    }} className="bg-primary-subtle" style={{width:"70%",boxShadow:'1px 1px 2px 2px black',justifyContent:'center',margin:'auto',borderRadius:'20px', height:'50%'}}>
       
    
          
        <div  className="tilt" style={{justifyContent:"space-between",alignItems:"center",display:"flex",flexDirection:"column",marginTop:"3rem" }}  >
<p className="open-sans text">Please click the button to mark  your attendency for today</p>
            <Button  onClick={() => { markAttendance(); Sendingattendency(); }}  disabled={attendency[0].Todaysdate === formattedDate && attendency[0].Status === "Present"}>Attendency</Button>
          
        </div> 
 
        </Tilt>
        </SwiperSlide>

        </Swiper>
        <div className='bg-primary-subtle div'><p className="open-sans text textdirection">Swipe to see more buttons. </p></div>
       
        <div className="ListStart"  style={{overflowX:'auto'}} > 
        <h1 className="open-sans Tableh1"> Students  Attendency </h1>
        <Table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Status</th></tr></thead>
              <tbody>
              {attendency.map((today, index) => (
      <tr key={index}>
        <td>{today.Todaysdate}</td>
        <td>{today.Status || "Abscent"}</td>
      </tr>
    ))}
               </tbody></Table></div> </section>
  )
}

export default Activities