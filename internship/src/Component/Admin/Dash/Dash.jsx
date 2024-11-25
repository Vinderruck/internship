import React from 'react'
import { useState } from 'react'
import AdminNav from '../AdminNav/AdminNav'
import List from '../Respomsibilities/List/List'
import Report from '../Respomsibilities/StudentReport/Report'
import LeaveApproval from '../Respomsibilities/LeaveRequest/LeaveApproval'
import Loggined from '../Respomsibilities/Loggedin/Loggined'
import Welcome from '../Respomsibilities/Welcome'
import LeaveDetails from '../Respomsibilities/LeaveRequest/LeaveDetails'
 

const AdminDash = () => {

 const [DashComponets, setDashComponets] = useState("Component5")
  
const handleComponents =(ComponentName)=>{
  setDashComponets(ComponentName);
}
 const  Components={
   Component1: <Report/>,
   Component2:<List/>,
   Component3:<LeaveApproval  onLinkClick={handleComponents} />,
 //  Component4:<Loggined/>,
   Component5:<Welcome/>,
   Component6:<LeaveDetails/>
}




const RenderComponet=()=>{
    return Components[DashComponets]
}
 return (
    <div style={{justifyContent:"center",display:"flex",flexDirection:"column"}}>
        <div>
        <AdminNav onLinkClick={handleComponents}/>
         
        </div>

        <div style={{marginTop:"6rem",marginLeft:"auto",marginRight:'auto',width:"100%",justifyContent:"center",alignItems:"center,"}}>
{RenderComponet()}
        </div>
    </div>
  )
}

export default AdminDash