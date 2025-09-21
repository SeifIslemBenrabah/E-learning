// controllers/cour.controller.js
const Resource = require('../models/resource.model');
const Module = require('../models/module.model');

// Create a new Resource
const createResource = async (req, res) => {
    try {
      console.log("Incoming data:", req.body);  // <--- add this
      const resource = await Resource.create(req.body);
      res.status(201).json(resource);
    } catch (error) {
      console.error("Create Resource Error:", error);
      res.status(400).json({ error: error.message });
    }
  };
  
// Get all resources with their modules
const getAllResources = async (req, res) => {
  try {
    const resources = await Resource.findAll({
      include: [{ model: Module, attributes: ['id', 'moduleName'] }]
    });
    res.json(resources);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single resource by ID
const getResourceById = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findByPk(id, {
      include: [{ model: Module, attributes: ['id', 'moduleName'] }]
    });

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a resource
const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const { Name,Link, Type, moduleId } = req.body;

    const resource = await Resource.findByPk(id);
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    await resource.update({ Name, Link, Type, moduleId });
    res.json(resource);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a resource
const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findByPk(id);

    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' });
    }

    await resource.destroy();
    res.json({ message: 'Resource deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createResource,
  getAllResources,
  getResourceById,
  updateResource,
  deleteResource,
};
