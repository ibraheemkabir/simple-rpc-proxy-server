const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const cors = require('cors')

const { JSONRPCServer } = require("json-rpc-2.0");

const server = new JSONRPCServer();


const app = express();
app.use(bodyParser.json());

const corsOptions = {
    origin: (origin, callback) => {
        callback(null, true)
    },
}

app.options('*', cors(corsOptions))

app.use("/", cors(corsOptions), (req, res) => {
  const jsonRPCRequest = req.body;
  const urlString = req.query["url"];
  const url = `${urlString}`;
  request(url, {
    method: "post",
    headers:
    { 
     "content-type": "application/json"
    },
    body: JSON.stringify(jsonRPCRequest)

  }).pipe(res);

});

app.listen(3001);
