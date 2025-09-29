const feedbackSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["Doctor", "Prescription"],
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    prescriptionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prescription",
        default: null
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Feedback", feedbackSchema);
