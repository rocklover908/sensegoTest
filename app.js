const express = require('express');
// const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();

 
var app = express();


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false,
    limit: '50mb'
}));



  let connectionString = 'mongodb://' + process.env.DATABASE_USERNAME + ':' + process.env.DATABASE_PASSWORD + '@' + process.env.DATABASE_HOST + ':' + process.env.DATABASE_PORT + '/' + process.env.DATABASE_NAME;
 
console.log(connectionString);

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true
}, function(error) {
    if (error) {
        console.log('Error connecting to mongodb:', error);
        process.exit();
    }

    app.use('/v1', require('./routes/api.route'));

    console.log('Successful connection to the database');
});

//console.log('The server is running');
const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
    console.log('Listening on port ' + port);
  
  });
module.exports = app;
