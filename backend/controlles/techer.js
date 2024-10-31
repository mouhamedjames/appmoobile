
import  bcrypt from 'bcrypt' 
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import Teacher from "../models/modelteacher.js"
dotenv.config()
export const singin = async (req,res,next)=>{
try 

{
    const pass = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, pass);
    
    const user= new Teacher({...req.body,password:hash})
    await user.save()

	
    res.status(200).json(user) 
   

}
catch(err)


{ next(err) }


}


export const singup = async (req,res,next)=>{
    try{
const user = await Teacher.findOne({email:req.body.email})
if(!user)return(res.status(400).send("user not found") )

const checkpassword=await bcrypt.compare(req.body.password,user.password)
if(!checkpassword) return(res.status(400).send("password not work "))

const token = jwt.sign({id:user._id},process.env.password)
//here it make a new sign with id:user.-d and password 
res.cookie("access_token",token,{httpOnly:true}).status(200).json(user)}
    
catch(err)


{next(err) }


}
export const userget=async (req,res,next)=>{

    try{
        const getuser= await Teacher.find()
    res.status(200).json(getuser)
    
    }
    catch(err)
    {
        next(err)
    
    
    }
    
    
    }
    export const userupdate=async(req,res,next)=>{
        try{
     const updateuser = await Teacher.findByIdAndUpdate( req.params.id,{ $set: req.body },
        { new: true })
    if (!updateuser) return(res.status(400).send("we didnt fount any user."))
        
    res.status(200).json(updateuser);
    //here $set to save  only the changed  one 
    
        }
        catch (err) {
            next(err)
          }
        
    
    }
    export const userdelete=async(req,res,next)=>{
    
        try {
            await Teacher.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted.");
          } catch (err) {
            next(err)
          }
        
    
    }


    
    