const express = require('express');
const orderController = require('../controllers/orderController');

const router = express.Router();

router.get('/orders', orderController.getAllOrders);
router.put('/orders/:id', orderController.updateOrderStatus);

module.exports = router;
