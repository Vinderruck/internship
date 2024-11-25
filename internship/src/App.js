import {Routes,Route,BrowserRouter} from "react-router-dom";
import { Login, Register, Dash } from "./Component/User";
import { AdminLogin } from "./Component/Admin";
 
import ProtectedRoutes from "./Component/Globalfiles/ProtectedRoures";
import AdminNav from "./Component/Admin/AdminNav/AdminNav";
import AdminDash from "./Component/Admin/Dash/Dash";
function App() {

  document.documentElement.style.background = "white"
  return (
     <BrowserRouter>
     
     <Routes>
      
      <Route path="/" element={<Login/>}/>
      <Route path="/Register" element={<Register/>}/>
      <Route path="/AdminLogin" element={<AdminLogin/>}/>
      <Route path="/Dash" element={<ProtectedRoutes><Dash/></ProtectedRoutes> }/>

      <Route path="/AdminDash" element ={<AdminDash/>}/>
      </Routes></BrowserRouter>

  );
}

export default App;
