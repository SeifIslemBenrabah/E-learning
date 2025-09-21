const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure "uploads" folder exists
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileController = require("../controllers/file.controller");
const upload = multer({ storage });


// 📌 Add a new file (single upload)
router.post("/", upload.single("file"), fileController.addfile);

// 📌 Get all files
router.get("/", fileController.getfiles);

// 📌 Get files by courId
router.get("/cour/:courId", fileController.getfilesByCourId);

// 📌 Get single file by ID
router.get("/:id", fileController.getfileById);

// 📌 Update file (optionally upload new one)
router.put("/:id", upload.single("file"), fileController.updatefile);

// 📌 Delete file
router.delete("/:id", fileController.deletefile);

module.exports = router;

