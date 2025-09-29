const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    guestName: {
        type: String,
        default: null,
        trim: true,
        minlength: [1, "Full name must have at least 1 character"],
        maxlength: [100, "Full name must not exceed 100 characters"],
        match: [/^[A-Za-zÀ-ỹ\s]+$/, "Full name must contain only letters and spaces"]
    },
    guestPhone: {
        type: String,
        default: null,
        trim: true,
        match: [/^(\+84|84|0)[1-9][0-9]{8,9}$/, 'Please enter a valid Vietnamese phone number']
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    scheduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "DoctorSchedule"
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected", "Completed"],
        default: "Pending"
    },
    createdBy: {
        type: String,
        enum: ["Patient", "Receptionist", "Guest"]
    }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);
