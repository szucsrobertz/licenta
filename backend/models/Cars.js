const mongoose = require('mongoose');

const CarsSchema = mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    year: { type: String, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    vin: { type: String, required: true },
    mileage: { type: String, required: true },
    features: { type: String, required: true },
    nr: { type: Number },
    date: { type: Date },
    price: { type: String, required: true },
    bidder: { type: String }
})

module.exports = mongoose.model('Cars', CarsSchema);