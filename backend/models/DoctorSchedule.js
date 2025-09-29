const doctorScheduleSchema = new mongoose.Schema({
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    specialty: {
        type: String
    },
    room: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("DoctorSchedule", doctorScheduleSchema);
