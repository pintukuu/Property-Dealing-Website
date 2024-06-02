import mongoose from "mongoose"

const BpSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    maxPeople: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    plotNumbers: [{ number: Number, unavailableDates: { type: [Date] } }]
}, { timestamps: true })

export default mongoose.model("Bp", BpSchema)