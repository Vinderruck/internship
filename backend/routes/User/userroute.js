import express from 'express';
import bcrypt from 'bcryptjs';
 import  multer from 'multer';
  import { Authentication } from '../../Authentication/Authentication.js';
  import {Leave,User, UserData} from '../../Schemas/index.js';



const route =express.Router();
//storage for file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  const upload = multer({ storage: storage });



  //getting the cookies and sending to the fronend
route.get('/Cookies', Authentication, (req, res) => {
  // Access the authenticated user from the session
  res.status(200).json({
      message: 'Access granted',
      User: req.session.User, // Corrected to access req.session.User
  });
});

//Logout Function
route.post('/Logout',(req,res)=>{
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out' });
    }
    res.clearCookie('connect.sid'); // Adjust cookie name if different
    res.status(200).json({ message: 'Logged out successfully' });
  });
})

  //Registration
route.post('/Registration', upload.single('file'), async (req,res)=>{
    const UserData =req.body
    
 
if (!req.file) {
   
    return res.status(400).json({ error: 'No file uploaded' });
   
  }
console.log(UserData.ConfirmPassword )
 const Salt = 12;
 const hashedPassword =   bcrypt.hashSync(UserData.ConfirmPassword,Salt)
 
 try {
   const UserSave = new User({
        Name:UserData.Name,
        Email:UserData.Email,
        Password:hashedPassword, 
        Image: {
            fileName: req.file.filename, // Assign the uploaded file's name here
            path: req.file.path
          },
    })

    await UserSave.save()
req.session.userName= UserSave.Name

//generatingimage url
const imageUrl = `${req.protocol}:/${req.get('host')}/uploads/${req.file.filename}`;




    res.status(200).json({message:`User Successfully registered`,
        session:{
UserName:req.session.UserName,

        },
        imageUrl: imageUrl 
    })
 } catch (error) {
    console.error(error);
        res.status(500).json({ error: 'Failed to register user' });
    
 }
})


//Login
route.post('/LoginUser',async (req,res)=>{
const UserDataLog =req.body;

if(!UserDataLog.Email || !UserDataLog.Password){
  return res.status(401).json({message:'Check you datainserted'})
}


//Checking for the email 
const UserFind = await User.findOne({Email:UserDataLog.Email})

if(!UserFind){
  return res.status(501).json({message:'No Email found'})
}


const ismatch = await bcrypt.compare(UserDataLog.Password,UserFind.Password)


if(!ismatch){
  console.log('Password miss match')
  return res.status(502).json({message:'Password does not match with one in database'})
}

//settin  session
req.session.User={User:UserFind.Name, 
  Image:UserFind.Image,
  Email:UserFind.Email}


res.status(200).json({
  message:"signed in",
 User: req.session.User
})
})


 //Sending the members attendency to thebackend
 route.post('/Data', async (req,res)=>{
  const UserInfor =req.body;
  try {
    const FindinguserData = UserData.findOne({Email:UserInfor.Email,Status: UserInfor.status, Date:UserInfor.Todaysdate}) 
    const PayLoadinfo = new UserData({
      Email:UserInfor.Email,
      Status:UserInfor.Status,
      Date:UserInfor.Todaysdate
    })
     
    await PayLoadinfo.save() 
  } catch (error) {
    return res.status(402).json(`We having this ${error}`)
  }
 
 })
//This function gets the user data (Date and status)
 route.post('/GetRecord',async (req,res)=>{
 

  const {Email}=req.body;


const IsEmail = await UserData.findOne({Email})
console.log(IsEmail)

if(IsEmail){
  console.log(IsEmail)
return res.json({
 User:{
   Date:IsEmail.Date,
   Status:IsEmail.Status
}
})}
else {
  // If user doesn't exist, send an error response
  res.status(404).json({
    success: false,
    message: 'User not found',
  })
}
})


//This function will send leave form

route.post('/Leave', async (req,res)=>{
  const Leaveform =req.body
 
console.log(Leaveform)
  if(!Leaveform){
return res.status(501).json({message:`The form is not valid form`})
  }
try {
  
  const LeaveInfo = new Leave({
    Email:Leaveform.Email,
    StartDate:Leaveform.StartDate,
    EndDate:Leaveform.EndDate,
    reason:Leaveform.reason
  })
  await LeaveInfo.save()
  return res.send({message:'Leave Form Sent'})
} catch (error) {
  return res.status(402).json(error)
}
 
})
export default route