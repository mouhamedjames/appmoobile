import mongoose from "mongoose";
const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
   
    },
    lastname: {
        type: String,
        required: true,

      },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    
    matricule: {
      type: String,
    
    },
      phone: {
        type: String,
        
      },
    password: {
      type: String,
      required: true,
    },
    notif: {
        type: Number,
        
      },
  },
  { timestamps: true }
);

export default mongoose.model("Student", StudentSchema);