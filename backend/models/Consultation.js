const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema({
    appointmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
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
    status: {
        type: String,
        enum: ["In Progress", "Completed"],
        default: "In Progress"
    },
    notes: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("Consultation", consultationSchema);
