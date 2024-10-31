
import dotenv from "dotenv"
import Lesson from "../models/modellesson.js"
dotenv.config()


export const lessonhistory=async (req,res,next)=>{

    try 

    {
lesson= await Lesson.findOne({teacherid:req.params.id})
    if(!lesson)return(res.status(400).send("user not found") )

res.status(200).json(lesson)



    }

    catch(err)


    { next(err) }
    
    
    }
export const createlesson = async (req,res,next)=>{
try 

{
  
    
    const lesson= new Lesson(req.body)
    await lesson.save()

	
    res.status(200).json(lesson) 
   

}
catch(err)


{ next(err) }


}






export const lessonget=async (req,res,next)=>{

    try{
        const getlesson= await Lesson.find()
    res.status(200).json(getlesson)
    
    }
    catch(err)
    {
        next(err)
    
    
    }
    
    
    }
    export const lessonupdate=async(req,res,next)=>{
        try{
     const updatelesson = await Lesson.findByIdAndUpdate( req.params.id,{ $set: req.body },
        { new: true })
    if (!updatelesson) return(res.status(400).send("we didnt fount any user."))
        
    res.status(200).json(updatelesson);
    //here $set to save  only the changed  one 
    
        }
        catch (err) {
            next(err)
          }
        
    
    }
    export const lessondelete=async(req,res,next)=>{
    
        try {
            await Lesson.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted.");
          } catch (err) {
            next(err)
          }
        
    
    }


    
    