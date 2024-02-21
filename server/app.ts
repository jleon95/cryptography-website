import * as express from 'express';
import { AddressInfo } from "net";
import * as path from 'path';
import monoalphabeticRoutes from './src/routes/monoalphabetic/routes';

const cors = require("cors");
const debug = require('debug')('my express app');
const app = express();

app.use(cors({ origin: process.env.FRONTEND_ADDRESS, methods: ["GET", "POST"], credentials: true }));
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', process.env.FRONTEND_ADDRESS);

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Pass to next layer of middleware
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(monoalphabeticRoutes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err[ 'status' ] = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
        let body = { message: err.message, error: err };
        res.status(err[ 'status' ] || 500).send(body);
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => { // eslint-disable-line @typescript-eslint/no-unused-vars
    let body = { message: err.message, error: {} };
    res.status(err.status || 500).send(body);
});

app.set('port', 1337);

const server = app.listen(app.get('port'), function () {
  debug(`Express server listening on port ${(server.address() as AddressInfo).port}`);
});