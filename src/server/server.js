const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const path = require('path');
const chalk = require('chalk');
const debug = require('debug')('app');
const authRouter = require('./app/routes/authRoutes');
const passportAuth = require('./app/configs/passport');

const URL = 'mongodb://localhost:27017/test';

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

const sessionOption = {
  key: 'app.sess',
  secret: 'Mysecret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 604800000 },
};

const app = express();
const port = process.env.PORT || 8000;

app.disable('x-powered-by');
app.use(limiter);
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(session(sessionOption));
app.use(helmet());

app.use(express.static(path.join(__dirname, '/public/')));

mongoose.connect(URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', () => debug('database connection error'));
db.once('open', () => {
  passportAuth(app);
  app.use(authRouter);

  app.use((err, req, res, next) => {
    debug(`error middleware called with ${err}`);
    const handledError = { ...err };
    if (!err.statusCode) handledError.statusCode = 500;
    res.status(handledError.statusCode).send(handledError.message);
    next(err);
  });

  app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
  });
});
