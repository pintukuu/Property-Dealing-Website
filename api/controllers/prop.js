import Prop from "../models/Prop.js";
import Bp from "../models/Bp.js";
export const createProp = async (req, res, next) => {
    try {
        const newProp = new Prop(req.body)
        const savedProp = await newProp.save();
        res.status(200).json(savedProp);
    } catch (err) {
        next(err)
    }
}
export const updateProp = async (req, res, next) => {
    try {

        const updatedProp = await Prop.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedProp);
    } catch (err) {
        next(err)
    }
}
export const deleteProp = async (req, res, next) => {
    try {

        await Prop.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel deleted");
    } catch (err) {
        next(err)
    }
}
export const getProp = async (req, res, next) => {
    try {

        const prop = await Prop.findById(req.params.id)
        res.status(200).json(prop);
    } catch (err) {
        next(err)
    }
}
export const getAllProp = async (req, res, next) => {
    try {
        const { min, max, ...others } = req.query
        const props = await Prop.find({ ...others, cheapestPrice: { $gt: min || 1, $lt: max || 1000000 } }).limit(req.query.limit)
        res.status(200).json(props);
    } catch (err) {
        next(err)
    }
}
export const countByCity = async (req, res, next) => {
    try {
        const cities = req.query.cities.split(",");
        const list = await Promise.all(cities.map(city => {
            return Prop.countDocuments({ city: city })
        }))
        // console.log(list);
        res.status(200).json(list);
    } catch (err) {
        next(err)
    }
}
export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Prop.countDocuments({ type: "hotel" })
        const apartmentCount = await Prop.countDocuments({ type: "apartment" })
        const resortCount = await Prop.countDocuments({ type: "resort" })
        const villaCount = await Prop.countDocuments({ type: "villa" })
        const cabinCount = await Prop.countDocuments({ type: "cabin" })
        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villas", count: villaCount },
            { type: "cabins", count: cabinCount }
        ]);
    } catch (err) {
        next(err)
    }
}

export const getProps = async (req, res, next) => {
    try {
        const prop = await Prop.findById(req.params.id)
        const list = await Promise.all(prop.rooms.map(room => {
            return Bp.findById(room);
        }))
        res.status(200).json(list)
    } catch (error) {
        next(error)
    }
}