const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const api = require('./routes/api');


//Morgan logs HTTP requests being processed by the application
app.use(morgan('dev'));

//Body parse extracts data to be readable
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

//Handle CORS errors
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header(
       "Access-Control-Allow-Headers",
       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );
   if(req.method === "OPTIONS") {
       res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
       return res.status(200).json({});
   }
   next();
});



//Register all routes from api.js
Object.keys(api).map((route) => {
    app.use(route, api[route])
});


//HANDLE ROUTES ERRORS
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});
//HANDLE SERVER ERRORS
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error : {
            message : error.message
        }
    });
});

module.exports = app;



