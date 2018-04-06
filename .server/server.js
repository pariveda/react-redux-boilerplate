'use strict';

var probe = require('ca-apm-probe').start(); // used for wiley server monitoring
const http = require('http');
const https = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const express = require('express');
// dotenv import must be before config import for .env variables to set
require('dotenv').config();
const localIp = require('my-local-ip');
const bodyParser = require('body-parser');
const compression = require('compression');

process.on('uncaughtException', function (err) {
  console.log(`UNCAUGHT EXCEPTION: ${err.stack || err.message}`);
});

process.on('unhandledRejection', reason => {
  console.error('unhandledRejection', reason, reason.stack);
});

const dev = process.env.NODE_ENV !== 'production';
console.log('DEV?', dev);
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();
  server.use(cookieParser());
  server.use(compression());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(bodyParser.json());
  server.use('/storybook', express.static('.storybook/static'));

  // handle authentication on for server requests
  server.get('*', (req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    try {
      handle(req, res, parsedUrl);
    } catch (e) {
      res.status(500);
      res.send(e);
    }
  });

  const httpServer = http.createServer(server);
  const httpPort = 8001;
  httpServer.listen(httpPort);

  console.log(`
    -----------------------------------------------------------
    Server is running on:-
    -----------------------------------------------------------
    http://localhost:${httpPort}
    http://${localIp()}:${httpPort}

  `);
});