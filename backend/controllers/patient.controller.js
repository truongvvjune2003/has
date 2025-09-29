const Appointment = require("../models/Appointment");
const Consultation = require("../models/Consultation");
const ExaminationResult = require("../models/ExaminationResult");
const Prescription = require("../models/Prescription");

const getMyAppointments = async (req, res) => {
  try {
    const data = await Appointment.find({ patientId: req.user.id }).populate("doctorId", "fullName specialization").sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

const getMyConsultations = async (req, res) => {
  try {
    const data = await Consultation.find({ patientId: req.user.id }).populate("doctorId", "fullName specialization").populate("appointmentId").sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

const getMyExaminations = async (req, res) => {
  try {
    const consults = await Consultation.find({ patientId: req.user.id }).select("_id");
    const ids = consults.map(c => c._id);
    const data = await ExaminationResult.find({ consultationId: { $in: ids } }).sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

const getMyPrescriptions = async (req, res) => {
  try {
    const data = await Prescription.find({ patientId: req.user.id }).populate("doctorId", "fullName").sort({ createdAt: -1 });
    res.json({ success: true, data });
  } catch (e) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

module.exports = { getMyAppointments, getMyConsultations, getMyExaminations, getMyPrescriptions };


