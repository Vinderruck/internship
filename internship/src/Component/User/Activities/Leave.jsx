 
import React,{useState,useEffect} from 'react'
import { Form,Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
 import 'bootstrap/dist/js/bootstrap.min.js';
import axios from 'axios';

const Leave = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [reason, setReason] = useState("");
    const [Sent, setSent] = useState(null)
    const [Email, setEmail] = useState(null);



//function geting the seeion 
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
          
          setEmail(response.data.User.Email)
      
      }  
    } catch (error) {
    
    }
  };
    Authentication()
  }, [])




//Function handling submitting the Leave Form
const handleSubmit = async (e)=>{
  e.preventDefault()
const LeaveData={
  Email,
  startDate,
  endDate,
  reason
}
try {
  await axios.post("http://localhost:5050/User/Leave",{
    LeaveData
  },
{
  headers:{
    "Content-Type":"application/json"
  }
}).then(res=>{
  console.log(res)
  setStartDate('')
  setEndDate('')
  setReason('')
  setSent(res.data)
})
} catch (error) {
  console.log(error)
}
 
}


  return (
    <section style={{width:"100%"  ,height:"70vh", }}> 
 <div  style={{width:"80%",marginTop:"2rem", marginLeft:'auto',marginRight:'auto',boxShadow:'1px 1px 1px 1px skyblue',borderRadius:"20px"}}>
   
   <Form   onSubmit={handleSubmit} style={{width:"100%",alignItems:'center'}} className="d-flex flex-column">
    <h1 className="open-sans Tableh1">Leave form</h1>
    <Form.Group  style={{width:"80%"}}>
   <Form.Label>Start</Form.Label>
   <Form.Control type="text" placeholder="When you wish to start the leave"
   required
   value={startDate}
   onChange={(e)=>setStartDate(e.target.value)}/>
   </Form.Group>
   <Form.Group  style={{width:"80%"}}>
   <Form.Label>End</Form.Label>
   <Form.Control type="text" placeholder="When you wish the leave End " required
   value={endDate} onChange={(e)=> setEndDate(e.target.value)}
   />
   </Form.Group>
   <Form.Group  style={{width:"80%",margin:'1rem'}}>
   <Form.Label>Reason</Form.Label>
   <textarea   placeholder=" Reason for your leave" style={{width:'100%',height:"20vh",overflow:'auto',borderRadius:"10px"}}
   value={reason} onChange={(e)=>setReason(e.target.value)}
   />
   </Form.Group>
   <Button type="submit" style={{margin:"0.4rem"}}>Send</Button>
    </Form> </div></section>
  )
}

export default Leave