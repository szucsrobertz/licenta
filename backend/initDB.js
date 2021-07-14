const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://localhost/licenta', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log("Mongodb connected...")
        });
}