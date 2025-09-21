const File = require("../models/file.model");
const path = require("path");

// 📌 Add a new file (local upload, multer puts path in req.file.path)
const addfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = await File.create({
      name: req.body.name || req.file.originalname,
      link: req.file.path, // saved local path (e.g. uploads/12345-filename.pdf)
      courId: req.body.courId,
    });

    res.status(201).json({ msg: "File created successfully!", file });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Get all files
const getfiles = async (req, res) => {
  try {
    const files = await File.findAll();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Get files by courId
const getfilesByCourId = async (req, res) => {
  try {
    const { courId } = req.params;
    const files = await File.findAll({ where: { courId } });

    if (!files || files.length === 0) {
      return res.status(404).json({ message: "No files found for this courId" });
    }

    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Get single file by ID (download)
const getfileById = async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) return res.status(404).json({ error: "File not found" });

    const filePath = path.join(__dirname, "../", file.link);
    res.download(filePath, file.name); // auto sets Content-Type & attachment
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// 📌 Update file
const updatefile = async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    if (req.file) {
      file.link = req.file.path;
      file.name = req.body.name || req.file.originalname;
    } else {
      file.name = req.body.name || file.name;
    }

    file.courId = req.body.courId || file.courId;
    await file.save();

    res.status(200).json({ msg: "File updated successfully!", file });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// 📌 Delete file (DB + local file)
const fs = require("fs");

const deletefile = async (req, res) => {
  try {
    const file = await File.findByPk(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    // Delete from local storage
    fs.unlink(file.link, (err) => {
      if (err) console.warn("File not found in storage, skipping delete:", err);
    });

    await file.destroy();
    res.status(200).json({ msg: "File deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports = {
  addfile,
  getfiles,
  getfileById,
  updatefile,
  deletefile,
  getfilesByCourId,
};
