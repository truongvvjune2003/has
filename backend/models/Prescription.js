const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({
    consultationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Consultation",
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    prescription: [
        {
            name: {
                type: String,
                required: true,
                trim: true,
                minlength: [1, "Name must have at least 2 characters"]
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, "Quantity must be greater than 0"]
            },
            note: {
                type: String,
                trim: true,
                maxlength: [500, "Notes up to 500 characters"]
            }
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Prescription", prescriptionSchema);
