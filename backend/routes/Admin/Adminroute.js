import express from 'express';
import Admin from '../../Schemas/AdminSchema.js';
import bcrypt from 'bcryptjs'
import 'dotenv/config'
import mongoose from "mongoose";

const route =express.Router()

route .post('/AdminLogin',async (req,res)=>{
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
      req.session.User={Admin:UserFind.Name, 
        Image:UserFind.Image,
        Email:UserFind.Email}
      console.log(req.session.User)
      
      res.status(200).json({
        message:"signed in",
       User: req.session.User
      })
      })
      
//Function creating admmin
async function CreateAdmin(){

try {
    
    
    //Checking if the admin exist

    const existingAdmin = await Admin.findOne({ role:"admin"})
    if(existingAdmin){

        return ; 
    }
const hashedPassword =   bcrypt.hashSync(process.env.AdminPassword,12)
    const AdminRegistred = new Admin({
        Name:process.env.Name,
        Email:process.env.Email,
        Password:hashedPassword,
        role:"admin"

    })
    await AdminRegistred.save()
} catch (error) {
    console.log(error)
}

}
CreateAdmin()
export default route