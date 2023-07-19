const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const cors = require('cors')

const app = express();

app.use(cors()); // <---- use cors middleware

app.use(bodyParser.json());


app.options('*', cors({ origin: '*' }))

app.use("/", cors({ origin: '*' }), (req, res) => {
  const jsonRPCRequest = req.body;
  const urlString = req.query["url"];
  const url = `${urlString}`;
  console.log(url)
  request(url, {
    method: "post",
    headers:
    { 
     "Access-Control-Allow-Origin": '*',
     "content-type": "application/json",
     "Access-Control-Allow-Credentials": true,
     "Access-Control-Allow-Headers": 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json'
    },
    body: JSON.stringify(jsonRPCRequest)

  }).pipe(res);

});

app.listen(process.env.PORT || 3001)

