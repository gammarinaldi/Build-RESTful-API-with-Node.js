const express = require('express');
const app = express();

// Express route
const doctorExpressRoute = express.Router();

// User schema
let DoctorSchema = require('../model/doctor.model');

// Get users
doctorExpressRoute.route('/').get((req, res) => {
    DoctorSchema.find((error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// Create user
doctorExpressRoute.route('/create-doctor').post((req, res, next) => {
    DoctorSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});


// Get single user
doctorExpressRoute.route('/get-doctor/:id').get((req, res) => {
    DoctorSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})


// Update user
doctorExpressRoute.route('/update-doctor/:id').put((req, res, next) => {
    DoctorSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
            console.log('Doctor successfully updated!')
        }
    })
})

// Delete user
doctorExpressRoute.route('/remove-doctor/:id').delete((req, res, next) => {
    DoctorSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = doctorExpressRoute;