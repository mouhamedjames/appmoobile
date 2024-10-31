import express from  "express"
import{createreservation ,reservationget,reserveupdate,reserverdelete,getpending}from "../controlles/reserver.js"
const  router = express.Router()
router.post("/create",createreservation)
router.get("/pending/:id",getpending)
router.put("/update/:id",reservationget)
router.get("/get",reserveupdate)
router.delete("/delete/:id",reserverdelete)
export default  router