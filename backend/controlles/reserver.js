
import dotenv from "dotenv"
import Reserve from "../models/modelreserver.js"
dotenv.config()

export const getpending=async (req,res,next)=>{

    try 

    {
reservation= await reserve.findOne({teacherid:req.params.id,
    status:"pending"

})
if(!reservation)return(res.status(400).send("user not found") )

res.status(200).json(reservation)

    }

    catch(err)


    { next(err) }
    
    
    }
export const createreservation = async (req,res,next)=>{
try 

{
  
    
    const reserv= new Reserve(req.body)
    await reserv.save()

	
    res.status(200).json(reserv) 
   

}
catch(err)


{ next(err) }


}






export const reservationget=async (req,res,next)=>{

    try{
        const getres= await Reserve.find()
    res.status(200).json(getres)
    
    }
    catch(err)
    {
        next(err)
    
    
    }
    
    
    }
    export const reserveupdate=async(req,res,next)=>{
        try{
     const updatereserve = await Reserve.findByIdAndUpdate( req.params.id,{ $set: req.body },
        { new: true })
    if (!updatereserve) return(res.status(400).send("we didnt fount any user."))
        
    res.status(200).json(updatereserve);
    //here $set to save  only the changed  one 
    
        }
        catch (err) {
            next(err)
          }
        
    
    }
    export const reserverdelete=async(req,res,next)=>{
    
        try {
            await Reserve.findByIdAndDelete(req.params.id);
            res.status(200).json("User has been deleted.");
          } catch (err) {
            next(err)
          }
        
    
    }


    
    