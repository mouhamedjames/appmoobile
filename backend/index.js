import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

import teacher from "./routes/teacher.js"
import student from "./routes/student.js"
import lesson from "./routes/lesson.js"
import  cookieParser from  'cookie-parser'
import reserver from "./routes/reserver.js"
const app =express()

app.use(cors()) //request in api axios for working
dotenv.config()

const connect = async () => {
    try {
      await mongoose.connect(process.env.mongo)
    } catch (error) {
      throw error
    }
  };
  mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
  });
  mongoose.connection.on("connected", () => {
    console.log("mongoDB connected!");
  });
  app.use(cookieParser())  //to make cookis work
  app.use(express.json()) // to make json work
  // the api

app.use("/api/lesson",lesson)
  app.use("/api/student",student)

  
      app.use("/api/teacher",teacher)
      app.use("/api/reservation",reserver)
  
      //if error next will go here
  app.use((err,req,res,next)=>{
    const errorStatus = err.status || 400;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
      success: false,
      status: errorStatus,
      message: errorMessage,
      stack: err.stack,
    });



  })

app.listen(8500,async()=>{ //to open the sever with protocol  http
     await connect()
    console.log("hello")
})