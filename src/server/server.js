const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require('morgan');
const session = require('express-session');
const userRouter = require("./app/routes/userRoutes");
const passportAuth = require('./app/configs/passport');
const {initDb} = require('./app/mongo/database');

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 ,
    credentials: true,
  };

const app = express();
const port = process.env.PORT || 8000;

app.disable('x-powered-by');
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(session({
    key: 'app.sess',
    secret: 'Mysecret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 604800000 }
}));
app.use(helmet());

initDb((err, database) => {
    if (err) return console.log(err);
    passportAuth(app, database);
    app.use('/user', userRouter);
    
    
    app.listen(port, () => {
        console.log("listening on " + port);
    });
})
