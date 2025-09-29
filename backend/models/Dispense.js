const mongoose = require("mongoose");

const dispenseSchema = new mongoose.Schema({
    prescriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prescription",
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    pharmacistId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    medicines: [
        {
            medicineId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Medicine",
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model("Dispense", dispenseSchema);
