const express = require('express');
const equipmentController = require('../controllers/equipmentController');

const router = express.Router();

router.get('/equipment', equipmentController.getAllEquipment);
router.put('/equipment/:id', equipmentController.updateEquipmentStatus);

module.exports = router;
