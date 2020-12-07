const express = require('express');
const router = express.Router();

const SearchController = require('../controllers/searchTool.controller');

router.get('/concerts/performer/:performer', SearchController.getPerformer);
router.get('/concerts/genre/:genre', SearchController.getGenre);
router.get('/concerts/price/:price_min/:price_max', SearchController.getPriceRange);
router.get('/concerts/price/day/:day', SearchController.getDayConcert);

module.exports = router;