import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
 import 'bootstrap/dist/js/bootstrap.min.js';
 import axios from "axios"
 import { logo } from '../../../Asset';
import {Link} from 'react-router-dom'
const AdminLogin = () => {



  const [UserDataLog, setUserDataLog] = useState({
    Email:'',
    Password:''
   })

   const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      


      await axios.post("http://localhost:5050/Admin/AdminLogin",UserDataLog,
        {
          headers:{
            'Content-type':'application/json'
          }
        }
      ).then(res=>{
        
        setUserDataLog({
     Name:'',
      Password:''
        })
        console.log(res)
      })

    } catch (error) {
      console.log(error)
    }
   }

  return (
    <div style={{width:"100%",justifyContent:"center" ,display:"flex", flexDirection:"column",alignItems:'center'}}>
    
        <Form onSubmit={handleSubmit}  className="Loginform">
        <div className= "logo"><img src={logo} alt="logo"  style={{}}/></div>
            <Form.Group  className="mb-3" style={{width:"100%", }}>
                <Form.Label className="LabelForm open-sans">Email</Form.Label>
                <Form.Control    className="FormInput open-sans" type="text" placeholder="Enter Your Email" required
                value={UserDataLog.Email}
                onChange={(e)=>setUserDataLog({...UserDataLog,Email:e.target.value})}/>
            </Form.Group>
            <Form.Group  style={{width:"100%"}}  className="mb-3">
                <Form.Label className="LabelForm open-sans">Password</Form.Label>
                <Form.Control type="text"  className="FormInput open-sans"  placeholder="Enter Your Password"
                 maxLength={10}  minLength={8} required
                 value={UserDataLog.Password}
                 onChange={(e)=> setUserDataLog({...UserDataLog, Password:e.target.value})}/>
            </Form.Group>
          <Button type="submit" style={{width:"40%", overflow:'hidden' }}>Login</Button> 
           
          <span className="logLinks">
            <span  > <Link to="/">UserLogin</Link></span><span style={{margin:"2rem"}}><Link to="/">ForgotPassword</Link></span></span>
       
        </Form>
    </div>
  )
}

export default AdminLogin