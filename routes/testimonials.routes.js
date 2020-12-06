const express = require('express');
const router = express.Router();

const TestimonialController = require('../controllers/testimonials.controllers');

router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/random', TestimonialController.getRandom);
router.get('/testimonials/:id', TestimonialController.getById);
router.post('/testimonials', TestimonialController.addNew);
router.put('/testimonials/:id', TestimonialController.updateById);
router.delete('/testimonials/:id', TestimonialController.deleteById);

module.exports = router;