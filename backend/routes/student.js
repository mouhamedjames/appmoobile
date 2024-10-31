import express from  "express"
import {singin,singup,userupdate,userget,userdelete} from "../controlles/student.js"
const  router = express.Router()
router.post("/singin",singin)
router.post("/singup",singup)
router.put("/update/:id",userupdate)
router.get("/get",userget)
router.delete("/delete/:id",userdelete)
export default  router