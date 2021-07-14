const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../models/Users');
const { registerValidation } = require('../models/Validation')

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        res.json({ message: err });
    }
});

router.post('/register', async (req, res) => {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const emailExist = await Users.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).json({ message: "email already exists", statusCode: 400, emailError: true })

    const usernameExist = await Users.findOne({ username: req.body.username });
    if (usernameExist) return res.status(400).json({ message: 'username already exists', statusCode: 400, userNameError: true })

    const user = new Users({
        email: req.body.email,
        password: hashedPassword,
        username: req.body.username
    });


    try {
        await user.save();
        res.status(200).json({ message: "ok", statusCode: 200 })
    } catch (err) {
        res.status(400).send(err)
    }
});

router.post('/login', async (req, res) => {
    console.log(req.body)

    const user = await Users.findOne({ email: req.body.email });
    if (!user) return res.status(400).send({ message: "email not found", statusCode: 400, emailError: true })             //todo       object with message and statusCode

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send({ message: "wrong password", statusCode: 400, passwordError: true })

    res.status(200).send({ isAuthenticated: true })
})

router.put('/settings', async (req, res) => {
    console.log(req.body);

    Users.findOneAndUpdate({ email: req.body.email },
        {
            $set: {
                name: req.body.name,
                zip: req.body.zip,
                cardNumber: req.body.cardNumber,
                date: req.body.date,
                cvc: req.body.cvc,
                phone: req.body.phone,
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
