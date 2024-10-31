import mongoose from "mongoose";
const lesson= new mongoose.Schema(
  {teacher: {
  
      type: Object,
     
    },
    teacherid: {
  
      type: String,
     
    },
  
  
    matiere: { type: String, required: true },

    date: { type: String, required: true },
    Heure: { type: String, required: true },
  
   
    available:  {type: String, required: true},
   
    },{ timestamps: true }
    
    )

    export default mongoose.model("Lesson", lesson);