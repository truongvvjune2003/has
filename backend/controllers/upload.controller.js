const uploadService = require("../services/upload.service");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

   
    const result = await uploadService.handleUpload(req.file);

    return res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      data: result,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = { uploadImage };
