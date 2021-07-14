const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    name: { type: String, required: true },
    zip: { type: String, required: true },
    cardNumber: { type: String, required: true },
    date: { type: Date, required: true },
    cvc: { type: String, required: true },
    phone: { type: String, required: true },


})

module.exports = mongoose.model('Users', UsersSchema);