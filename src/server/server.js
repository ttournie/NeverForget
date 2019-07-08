const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const session = require('express-session');
const rateLimit = require('express-rate-limit');
const path = require('path');
const chalk = require('chalk');
const debug = require('debug')('app');
const db = require('./app/configs/mongo');
const redis = require('redis');
//const redisClient = redis.createClient();
//const redisStore = require('connect-redis')(session);
const authRouter = require('./app/routes/authRoutes');
const passportAuth = require('./app/configs/passport');
const noteRouter = require('./app/routes/noteRoutes');


const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

/*redisClient.on('error', (err) => {
  debug('Redis error: ', err);
});*/

const sessionOption = {
  key: 'app.sess',
  secret: 'Mysecret',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 604800000 },
  //store: new redisStore({ host: 'localhost', port: 6379, client: redisClient, ttl: 86400 }),
};

const app = express();
const port = process.env.PORT || 8000;

db.on('error', () => debug('database connection error'));

app.disable('x-powered-by');
app.use(limiter);
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use(morgan('tiny'));
app.use(session(sessionOption));
app.use(helmet());
app.use(express.static(path.join(__dirname, '/public/')));

passportAuth(app);
app.use(authRouter);
app.use('/notes', noteRouter);

app.use((err, req, res, next) => {
  debug(`error middleware called with ${err}`);
  const handledError = { ...err };
  if (!err.statusCode) handledError.statusCode = 500;
  res.status(handledError.statusCode).send(handledError.message);
  next(err);
});

db.once('open', () => {
  app.listen(port, () => {
    debug(`listening on port ${chalk.green(port)}`);
  });
});

module.exports = app;
