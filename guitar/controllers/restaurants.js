const Restaurant = require('../models/Restaurant');

exports.getRestaurants = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.find().populate('reservations');
        res.status(200).json({ success: true, count: restaurants.length, data: restaurants });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

exports.getRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: restaurant });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

exports.createRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.create(req.body);
        res.status(201).json({ success: true, data: restaurant });
    } catch (err) {
        res.status(400).json({ success: false, message: err.message });
    }
};

exports.updateRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!restaurant) return res.status(400).json({ success: false });
        res.status(200).json({ success: true, data: restaurant });
    } catch (err) {
        res.status(400).json({ success: false });
    }
};

exports.deleteRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        
        if (!restaurant) {
            return res.status(404).json({ 
                success: false, 
                message: `Restaurant not found with id of ${req.params.id}` 
            });
        }

        await restaurant.deleteOne();
        res.status(200).json({ success: true, data: {} });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false, message: err.message }); 
    }
};