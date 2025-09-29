const mongoose = require("mongoose");

const examinationResultSchema = new mongoose.Schema({
    consultationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Consultation",
        required: true
    },
    tests: [
        {
            testName: String,
            result: String,
            date: Date
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("ExaminationResult", examinationResultSchema);
