const express = require('express');
const router = express.Router();
const itemProgressController = require('../controllers/interactionController');

router.get('/getItemProgress/:itemId', itemProgressController.getItemProgress);
router.put('/updateItemProgress/:itemId', itemProgressController.updateItemProgress);

module.exports = router;