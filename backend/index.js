import express from"express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import session from 'express-session';
import UserConnection from './routes/User/userroute.js';
import AdminRoute from './routes/Admin/Adminroute.js';
import 'dotenv/config'
import mongoose from 'mongoose'



const url = process.env.MONGODB_URI;
const port = process.env.PORT || 5000; 

const app = express()
app.use(express.json())
app.use(cors( {origin: ['http://localhost:3000'], // Update this to your frontend's URL
    METHOD:['POST,GET'],
    credentials:true}))
app.use(cookieParser());
app.use(session({
    secret:  process.env.Secrete, //  mysecrete key
    resave: false, 
    saveUninitialized: true,  
    cookie:({
        secure:false,maxAge: 60000 * 60 
    })
}))

try{
mongoose.connect(url)
console.log('conncted')
} catch (error) {
console.log('failed toconect')   
}



//user of routes
app.use('/User',UserConnection)


//admin router
app.use('/Admin',AdminRoute)

app.listen(port,()=> console.log(`the server is connected to port ${port}`))
 