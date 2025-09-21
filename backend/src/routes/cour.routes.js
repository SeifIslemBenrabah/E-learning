const express = require("express")
const router = express.Router()
const multer = require("multer");
const {  createCour, getAllCours, getCourById,updateCour, deleteCour} = require('../controllers/Cour.controller')
const upload = multer({ storage: multer.memoryStorage() });
router.post("/",  upload.array("files"),createCour);

// Get all modules
router.get("/",getAllCours);


// Get a module by ID
router.get("/:id", getCourById);

// Update a module
router.put("/:id", updateCour);

// Delete a module
router.delete("/:id", deleteCour);

module.exports = router;