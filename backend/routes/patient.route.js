const express = require("express");
const auth = require("../middleware/auth.middleware");
const { getMyAppointments, getMyConsultations, getMyExaminations, getMyPrescriptions } = require("../controllers/patient.controller");

const router = express.Router();

router.get("/appointments/my", auth, getMyAppointments);
router.get("/consultations/history", auth, getMyConsultations);
router.get("/examinations/my", auth, getMyExaminations);
router.get("/prescriptions/my", auth, getMyPrescriptions);

module.exports = router;


