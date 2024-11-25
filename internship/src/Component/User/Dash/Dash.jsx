import React from 'react'
import { useState } from 'react'
import {Activities, View,Nav, Leave} from "../index.js"

const Dash = () => {

 const [DashComponets, setDashComponets] = useState("Component1")
  
const handleComponents =(ComponentName)=>{
  setDashComponets(ComponentName);
}
 const  Components={
   Component1:<Activities  onLinkClick={handleComponents}/>,
   Component2:<View/>,
   Component3:<Leave/>
}




const RenderComponet=()=>{
    return Components[DashComponets]
}
 return (
    <div style={{justifyContent:"center",display:"flex",flexDirection:"column"}}>
        <div>
        <Nav onLinkClick={handleComponents}/>
        </div>

        <div style={{marginTop:"6rem",marginLeft:"auto",marginRight:'auto',width:"100%",justifyContent:"center",alignItems:"center,"}}>
{RenderComponet()}
        </div>
    </div>
  )
}

export default Dash