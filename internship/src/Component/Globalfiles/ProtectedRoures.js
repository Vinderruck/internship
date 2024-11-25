import React, { useEffect,useState} from 'react';
 import { Navigate } from 'react-router-dom';
 import axios from 'axios';




 const ProtectedRoutes = ({ children }) => {
 
  const [isLoggedIn, setIsLoggedIn] = useState(null);
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
        setIsLoggedIn(true)
       
    }  else {
        setIsLoggedIn(false); // User is not logged in
      }
  } catch (error) {
   setIsLoggedIn(false)
  }
};
  Authentication()
}, [])
  if(isLoggedIn === null){
    return <div style={{textAlign:'center',margin:'auto'}}>Loading...</div>; // Navigate to the dashboard
  }


  if(isLoggedIn === false){
    return  <Navigate to="/"/>;
  }
  // If the user is authenticated, render the requested component (children)
  return children;
};

export default ProtectedRoutes;