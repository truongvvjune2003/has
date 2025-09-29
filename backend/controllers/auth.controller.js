const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateAccessToken, generateRefreshToken } = require("../services/auth.service");
const { sendMail } = require("../utils/mailer");

let refreshTokens = []; 

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ success: false, message: "Sai email hoặc mật khẩu" });
  }

  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);

  refreshTokens.push(refreshToken); 

  res.json({
    success: true,
    accessToken,
    refreshToken,
  });
};

const register = async (req, res) => {
  try {
    const { role, fullName, dateOfBirth, gender, email, phone, password, address, specialization } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ success: false, message: "Email đã tồn tại" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ role, fullName, dateOfBirth, gender, email, phone, password: hashed, address, specialization });
    try {
      await sendMail({ to: user.email, subject: "Đăng ký tài khoản thành công", html: `<p>Xin chào ${user.fullName}</p>` });
    } catch (e) {}
    res.status(201).json({ success: true, message: "Đăng ký thành công" });
  } catch (e) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
    res.json({ success: true, data: user });
  } catch (e) {
    res.status(500).json({ success: false, message: "Lỗi server" });
  }
};

const refreshToken = (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "Không có token" });
  if (!refreshTokens.includes(token)) return res.status(403).json({ message: "Token không hợp lệ" });

  try {
    const payload = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = generateAccessToken(payload.id);
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    return res.status(403).json({ message: "Token không hợp lệ" });
  }
};

const logout = (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(t => t !== token);
  res.json({ message: "Đã logout" });
};

module.exports = { login, register, me, refreshToken, logout };
 
