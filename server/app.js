const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('morgan');
const HTTPS_PORT = 4000;
const fs = require('fs');
const indexRouter = require('./routes');
const https = require('https');

app.use(cors({
    origin: ["https://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
}));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(logger('dev'));
// app.use('/',indexRouter);

let httpsServer;
if(fs.existsSync("./key.pem") && fs.existsSync("./cert.pem")){

  const privateKey = fs.readFileSync(__dirname + "/key.pem", "utf8");
  const certificate = fs.readFileSync(__dirname + "/cert.pem", "utf8");
  const credentials = { key: privateKey, cert: certificate };

  httpsServer = https.createServer(credentials, app);
  httpsServer.listen(HTTPS_PORT, () => console.log("HTTPS server runnning"));

} else {
  httpsServer = app.listen(HTTPS_PORT, () => console.log("HTTP server running"));
}
module.exports = httpsServer;
