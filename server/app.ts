import * as express from 'express';
import { AddressInfo } from "net";
import * as path from 'path';
const cors = require("cors");

import monoalphabetic from './src/routes/monoalphabetic/monoalphabetic.controller';

const debug = require('debug')('my express app');
const app = express();

app.use(cors({ origin: "http://localhost:5173", methods: ["GET","POST"] }));
app.use('/monoalphabetic', monoalphabetic);

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