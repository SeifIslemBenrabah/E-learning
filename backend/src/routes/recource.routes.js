const express = require("express")
const router = express.Router()
const {  createResource, getAllResources, getResourceById,updateResource, deleteResource} = require('../controllers/resource.controller')

router.post("/", createResource);

// Get all modules
router.get("/", getAllResources);


// Get a module by ID
router.get("/:id", getResourceById);

// Update a module
router.put("/:id", updateResource);

// Delete a module
router.delete("/:id", deleteResource);

module.exports = router;