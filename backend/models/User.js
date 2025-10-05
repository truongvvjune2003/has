const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ["Patient", "Doctor", "Receptionist", "Pharmacist"],
    required: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, "Full name must have at least 1 character"],
    maxlength: [100, "Full name must not exceed 100 characters"],
    match: [/^[A-Za-zÀ-ỹ\s]+$/, "Full name must contain only letters and spaces"]
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  email: {
    type: String,                      // Kiểu dữ liệu String
    required: true,                    // Bắt buộc phải có
    unique: true,                      // Không được trùng trong DB
    lowercase: true,                   // Tự động chuyển thành chữ thường
    trim: true,                        // Loại bỏ khoảng trắng đầu/cuối
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    match: [/^(\+84|84|0)[1-9][0-9]{8,9}$/, 'Please enter a valid Vietnamese phone number']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  address: {
    type: String
  },
  specialization: {
    type: String
  }, // chỉ Doctor
  avatar: {
    type: String, // URL ảnh đại diện
    default: ""
  },
  emailVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
