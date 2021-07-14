const express = require('express');
const bcrypt = require('bcryptjs');
const Cars = require('../models/Cars');
const path = require('path')

var multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        console.log(file.files)

        for (let x = 1; x <= req.body.nr; x++) {
            if (typeof (file) === "object") {
                cb(null, req.body.name + x + '.jpg')
            }
        }
    }
})

var upload = multer({ storage: storage })

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const cars = await Cars.find();
        res.json(cars);
    } catch (err) {
        res.json({ message: err });
    }
});



router.post('/submit', upload.array('images', 4), async (req, res) => {
    date = new Date();
    date.setDate(date.getDate() + 7)
    const car = new Cars({
        name: req.body.name,
        number: req.body.number,
        year: req.body.year,
        make: req.body.make,
        model: req.body.model,
        vin: req.body.vin,
        mileage: req.body.mileage,
        features: req.body.features,
        nr: req.body.nr,
        date: date + 7,
        price: req.body.price
    });

    try {
        await car.save();
        res.status(200).json({ message: "ok", statusCode: 200 })
    } catch (err) {
        res.status(400).send(err)
    }

})



router.get('/', async (req, res) => {
    try {
        const cars = await Cars.find();
        res.json(cars);
    } catch (err) {
        res.json({ message: err });
    }
});

router.put("/auction", async (req, res) => {
    var d = new Date(req.body.date); d.setMinutes(d.getMinutes() + 30)
    Cars.findOneAndUpdate({ name: req.body.name },
        {
            $set: {
                price: req.body.newPrice,
                date: d,
                bidder: req.body.bidder
            }
        },
        { new: true },
        (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }

            console.log(doc);
        });
})

module.exports = router;