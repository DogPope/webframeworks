const mongoose = require('mongoose');
const {customerModel} = require("../models/locations");
const Customer = mongoose.model('customer');
const locationsCreate = function (req, res) {
    Customer.create({
        username: req.body.username,
        password: req.body.password,
        phone: req.body.phone,
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)]
    }, (err, location) => {
        if (err) {
            res
                .status(400)
                .json(err);
        } else {
            res
                .status(201)
                .json(location);
        }
    });
};
const locationsListByDistance = function (req, res) {
    res
        .status(200)
        .json({"status" : "success"}); };
const locationsReadOne = function (req, res) {
    if (req.params && req.params.locationid) {
        Location
            .findById(req.params.locationid)
            .then((err, location) => {
                if (!location) {
                    res
                        .status(404)
                        .json({
                            "message": "locationid not found"
                        });
                    return;
                } else if (err) {
                    res
                        .status(404)
                        .json(err);
                    return;
                }
                res
                    .status(200)
                    .json(location);
            });
    } else {
        res
            .status(404)
            .json({
                "message": "No locationid in request"
            });
    }
};
const locationsUpdateOne = function (req, res) {
    res
        .status(200)
        .json({"status" : "success"});
};
const locationsDeleteOne = function (req, res) {
    res
        .status(200)
        .json({"status" : "success"});
};
module.exports = {
    locationsListByDistance,
    locationsCreate,
    locationsReadOne,
    locationsUpdateOne,
    locationsDeleteOne
};