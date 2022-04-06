const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');
const fs = require('fs');
const indexRouter = require('./routes');

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(logger('dev'));
app.use(
    cors({
      origin: ['https://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS']
    })
  );

app.use('/', indexRouter);

const HTTPS_PORT = process.env.HTTPS_PORT || 4000;

let server;
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const privateKey = fs.readFileSync(__dirname + '/key.pem', 'utf8');
  const certificate = fs.readFileSync(__dirname + '/cert.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  server = https.createServer(credentials, app);
  server.listen(HTTPS_PORT, () => console.log('https server runnning'));
} else {
  server = app.listen(HTTPS_PORT, () => console.log('http server runnning'));
}
module.exports = server;
