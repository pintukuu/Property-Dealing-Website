import Bp from "../models/Bp.js";
import Prop from "../models/Prop.js";

import { createError } from "../utils/error.js"

export const createBp = async (req, res, next) => {

    const propId = req.params.propid;
    const newBp = new Bp(req.body)

    try {
        const savedBp = await newBp.save()
        try {
            await Prop.findByIdAndUpdate(propId, {
                $push: { rooms: savedBp._id }
            })
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedBp);
    } catch (err) {
        next(err)
    }
}
export const updateBp = async (req, res, next) => {
    try {

        const updatedBp = await Bp.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedBp);
    } catch (err) {
        next(err)
    }
}
export const deleteBp = async (req, res, next) => {
    try {
        const propId = req.params.propid;
        try {
            await Prop.findByIdAndUpdate(propId, {
                $pull: { rooms: req.params.id }
            })
        } catch (err) {
            next(err)
        }
        await Bp.findByIdAndDelete(req.params.id)
        res.status(200).json("Bp deleted");
    } catch (err) {
        next(err)
    }
}
export const getBp = async (req, res, next) => {
    try {

        const bp = await Bp.findById(req.params.id)
        res.status(200).json(bp);
    } catch (err) {
        next(err)
    }
}
export const getAllBp = async (req, res, next) => {
    try {

        const bps = await Bp.find()
        res.status(200).json(bps);
    } catch (err) {
        next(err)
    }
}