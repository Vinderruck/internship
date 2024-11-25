import React,{useState,useEffect} from 'react'
import {Table} from 'react-bootstrap';
import axios from 'axios'

const View = () => {
 const [Date, setDate] = useState(null);
 const [Status, setStatus] = useState(null)
 const [Email, setEmail] = useState(null);
 const [RecordData, setRecordData] = useState([])
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

 //function gtting the details
 useEffect(() => {
   
 
 
const GettingtheRecord = async ()=>{


   if(Email){
      
    
   await axios.post('http://localhost:5050/User/GetRecord',{Email},
     { headers:{
         "Content-Type":"application/json"
      }}
   ) .then(response=>{
    const userRecords = response.data.User;
    console.log(response.data.User)
    const recordsArray = Array.isArray(userRecords)
            ? userRecords
            : [userRecords];
    setRecordData(recordsArray )
   })
}
}
GettingtheRecord()
}, [Email])
 
  return (
   <div className="ListStart"  style={{overflowX:'auto'}} > 
   <h1 className="open-sans Tableh1"> Student Record </h1>
    <Table striped hoved border>
       <thead>
        <tr>
          <th>#</th>
            <th>Date</th>
            <th>Status</th>
        </tr>
       </thead>
       <tbody>
          {RecordData.map((record,index)=>{
            return (
       <tr key={index + 1}>
             <td>{index + 1}</td>
                 <td>{record.Date || "No Data"}</td>
                 <td>{record.Status || "No Data"}</td>
               </tr>

        )}) }
       </tbody>
    </Table>
 
   
    </div> 
  )
}

export default View