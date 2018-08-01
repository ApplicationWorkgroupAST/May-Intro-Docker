'use strict';

const express = require('express');
const request = require('request');

const PORT = 3000;
let HOST = "not known";
const BUSINESS_LAYER_IP = process.env.BUSINESS_LAYER_IP;
const BUSINESS_LAYER_PORT = process.env.BUSINESS_LAYER_PORT;

//require means load or create an object in this case
//get the dns object and uses its lookup method to lookup the ip address 
//of our host.  We get the hostname using the os object and calling the 
//hostname() method on this object
//
//nodejs uses only one thread so we need to use callbacks which get executed
//by the principal and only thread when the results -- usually from async i/o
//get returned

//In ENGLISH this line says look up the ip address of our hostname and when you
//get it invoke our CALLBACK
require('dns').lookup(require('os').hostname(),

  function mycallback(err, host_ip_address, fam) {

     HOST = host_ip_address;
     const app = express();
     app.get('/', (req, res) => {
       res.send('Hello world from ' + `Running on http://${HOST}:${PORT}`);
     });

     //Translate passed in string
     app.get('/toRussian', (req, res) => {

       let value = req.query.inString;
       let response = res;

       //call our microservice through the API Gateway
       request.get(`http://${BUSINESS_LAYER_IP}:${BUSINESS_LAYER_PORT}/stringFun/translate?p=` + value, function (err, res, body) {
           if (!err) {
             var resultsObj = JSON.parse(body);
             response.send(resultsObj);
           }
           else {
             response.send('and error occurred: ' + JSON.stringify(err));
           }
      });
     });

     app.listen(PORT, HOST);
})
