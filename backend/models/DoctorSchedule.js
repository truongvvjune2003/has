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
    timeSlots: [
        {
            startTime: { type: String, required: true },   // "07:00"
            endTime: { type: String, required: true },     // "08:00"
            capacity: { type: Number, default: 1 },        // số bệnh nhân tối đa
            bookedCount: { type: Number, default: 0 },     // đã confirm bao nhiêu người
            status: {
                type: String,
                enum: ["available", "full", "closed"],       // slot mở, đã full, hoặc đóng
                default: "available"
            }
        }
    ],
    specialty: {
        type: String
    },
    room: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model("DoctorSchedule", doctorScheduleSchema);
