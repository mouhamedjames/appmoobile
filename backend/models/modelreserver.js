import mongoose from "mongoose";
const reservation= new mongoose.Schema(
  {
    status: {
      type: String,
     

    },
    idstudent: {
      type: String,
     

    },
   
   
     lesson: {
      type: Object,
     
    },
    lessonid: {
      type: Object,
     
    },
    lessonaccepted: {
        type: Object,
       
      },
      Studentsid: {type: Object,},
      teacherid:{
        type: String,
       
  
      },
   
   
  },
  { timestamps: true }
);

export default mongoose.model("Reserve", reservation);