const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const ctrl = require("../controllers/fileController");

//Upload (image/pdf/video supported)
router.post("/upload", auth, upload.single("file"), ctrl.uploadFile);

// Get files by folder
router.get("/:folderId", auth, ctrl.getFiles);

module.exports = router;