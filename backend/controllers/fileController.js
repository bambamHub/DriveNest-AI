const File = require("../models/File");

//Upload
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded ❌",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized ❌",
      });
    }

    const file = await File.create({
      name: req.file.originalname,
      path: req.file.path, 
      size: req.file.size,
      folder: req.body.folder,
      user: req.user.id,
      type: req.file.mimetype, 
    });

    res.status(201).json({
      success: true,
      file,
    });
  } catch (err) {
    console.error("UPLOAD ERROR:", err);

    res.status(500).json({
      success: false,
      message: err.message || "Upload failed",
    });
  }
};

// ✅ Get files
exports.getFiles = async (req, res) => {
  try {
    const files = await File.find({
      folder: req.params.folderId,
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(files);
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching files",
    });
  }
};