import express from "express";
import { countByCity, countByType, createProp, deleteProp, getAllProp, getProp, getProps, updateProp } from "../controllers/prop.js";
import { verifyAdmin } from "../utils/verifyToken.js"
import { createError } from "../utils/error.js";

const router = express.Router();

//create 

router.post("/", verifyAdmin, createProp);

// Update

router.put("/:id", verifyAdmin, updateProp)
//delete

router.delete("/:id", verifyAdmin, deleteProp)

//get
router.get("/find/:id", getProp)

//getall

router.get("/", getAllProp)
router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/bps/:id", getProps)

export default router;