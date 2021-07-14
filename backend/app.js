const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
var multer = require('multer');
var fs = require('fs');
const path = require('path')

require('./initDB')();

app.use(cors());
app.use(bodyParser.json());

//const AppointmentRoute = require('./routes/appointments');
const UsersRoute = require('./routes/users');
const CarsRoute = require('./routes/cars');



//app.use('/appointment', AppointmentRoute)

app.use('/users', UsersRoute);
app.use('/cars', CarsRoute);

// app.use(express.static('uploads'));
app.use("/image", express.static(path.join(__dirname, "uploads")));


app.listen(3001);