import express from "express";
import { createBp, deleteBp, getAllBp, getBp, updateBp } from "../controllers/bp.js";
import { verifyAdmin } from "../utils/verifyToken.js"
import { createError } from "../utils/error.js";

const router = express.Router();

//create

router.post("/:propid", verifyAdmin, createBp);

// Update

router.put("/:id", verifyAdmin, updateBp)
//delete

router.delete("/:id/:propid", verifyAdmin, deleteBp)

//get
router.get("/:id", getBp)

//getall

router.get("/", getAllBp)

export default router;