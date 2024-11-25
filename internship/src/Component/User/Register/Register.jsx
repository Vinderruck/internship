import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
 import 'bootstrap/dist/js/bootstrap.min.js';
 import axios from 'axios'
 
 import { logo } from '../../../Asset';
import {Link} from 'react-router-dom'
 
const  Register = () => {


  // const [Name, setName] = useState("")
  // const [Email, setEmail] = useState("")
  // const [CreatePassword, setCreatePassword] = useState("")
  //   const [ConfirmPassword, setConfirmPassword] = useState("")
  //   const [Image, setImage] = useState("")

const [UserData, setUserData] = useState({
Name:'',
Email:'',
CreatePassword:'',
ConfirmPassword:'',
 Image:''
})
axios.defaults.withCredentials=true
    //function to submit
    const handleSubmit = async (e)=>{
      e.preventDefault();

      if(UserData.CreatePassword != UserData.ConfirmPassword){
        alert( 'Check you Password and confirm them')
        return
      }
      const formData = new FormData();
      formData.append('Name', UserData.Name);
      formData.append('Email', UserData.Email);
      formData.append('CreatePassword', UserData.CreatePassword);
      formData.append('ConfirmPassword', UserData.ConfirmPassword);
      formData.append('file', UserData.Image);  
    
      try {
       

        await axios.post('http://localhost:5050/User/Registration',formData,{
       
            headers:{
            'Content-Type': 'multipart/form-data',
            }
          }
        ) .then((res)=>{
          setUserData({
            Name:'',
Email:'',
CreatePassword:'',
ConfirmPassword:'',
 Image:''
          })
          console.log(res)
        })
      } catch (error) {
        console.log(error)
      }
    }
    //         
  
  return (
    <div style={{width:"100%",justifyContent:"center" ,display:"flex", flexDirection:"column",alignItems:'center'}}>
    
        <Form  onSubmit={handleSubmit} className="Loginform">
        <div className= "logo"><img src={logo} alt="logo"  style={{}}/></div>
        <Form.Group  className="mb-3" style={{width:"100%", }}>
                <Form.Label className="LabelForm open-sans">Email</Form.Label>
                <Form.Control    className="FormInput open-sans" type="email"
                
                placeholder="Enter Your Email" required
                
                value={UserData.Email}
                onChange={(e)=> setUserData({...UserData,Email:e.target.value})}/>
            </Form.Group>
            <Form.Group  className="mb-3" style={{width:"100%", }}>
                <Form.Label className="LabelForm open-sans">Name</Form.Label>
                <Form.Control    className="FormInput open-sans" type="text" placeholder="Enter Your Name" 
                required
                value={UserData.Name}
                onChange={(e)=> setUserData({...UserData,Name:e.target.value})}  />
            </Form.Group>
            <Form.Group  className="mb-3" style={{width:"100%", }}>
                <Form.Label className="LabelForm open-sans">Photo</Form.Label>
                <Form.Control    className="FormInput open-sans" type="file"    id="image"
          name="image" accept="image/*" required
          onChange={(e)=> setUserData({...UserData,Image:e.target.files[0]})}
           
          />
            </Form.Group>
            <Form.Group  style={{width:"100%"}}  className="mb-3">
                <Form.Label className="LabelForm open-sans">Create Password</Form.Label>
                <Form.Control type="Password"  className="FormInput open-sans"  placeholder="  Create Password" maxLength={10}  minLength={8} required
                value={UserData.CreatePassword}
                onChange={(e)=> setUserData({...UserData,CreatePassword:e.target.value})}
                />
            </Form.Group>
            <Form.Group  style={{width:"100%"}}  className="mb-3">
                <Form.Label className="LabelForm open-sans">Confirm Password</Form.Label>
                <Form.Control type="Password"  className="FormInput open-sans"  placeholder="  Cornfirm Password" maxLength={10}  
                minLength={8} required
                value={UserData.ConfirmPassword}
                onChange={(e)=> setUserData({...UserData,ConfirmPassword:e.target.value})}
                />
            </Form.Group>
          <Button type="submit" style={{width:"40%", overflow:'hidden' }}>Register</Button> 
           
          <span className="logLinks">
            <span  > <Link to="/">UserLogin </Link></span><span style={{margin:"2rem"}}><Link to="/AdminLogin">AdminLogin</Link></span></span>
       
        </Form>
    </div>
  )
}

export default  Register