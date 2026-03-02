const express = require('express');
const { getRestaurants , getRestaurant, createRestaurant , updateRestaurant , deleteRestaurant } = require('../controllers/restaurants');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.get('/', getRestaurants)
      .get('/:id', getRestaurant)
      .post('/', protect, createRestaurant)
      .put('/:id', protect, updateRestaurant)
      .delete('/:id', protect, deleteRestaurant);

module.exports = router;