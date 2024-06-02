import express from "express";
import { deleteUser, getAllUser, getUser, updateUser } from "../controllers/User.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

// import { createError } from "../utils/error.js";

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//     res.send("User Logged in ")
// })
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//     res.send("User Logged in and can delete account ")
// })
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//     res.send("Admin Logged in and can delete all account ")
// })

// Update

router.put("/:id", verifyUser, updateUser)
//delete

router.delete("/:id", verifyUser, deleteUser)

//get
router.get("/:id", verifyUser, getUser)

//getall

router.get("/", verifyAdmin, getAllUser)

export default router;