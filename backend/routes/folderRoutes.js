// routes/folderRoutes.js
const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const ctrl = require("../controllers/folderController");

router.post("/", auth, ctrl.createFolder);
router.get("/", auth, ctrl.getFolders);
router.get("/size/:id", auth, ctrl.getFolderSize);

module.exports = router;