/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/



var https = require('https');
var express = require('express')
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())
https.createServer(app)

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.set("Access-Control-Allow-Origin", "*")
  res.set("Access-Control-Allow-Headers", "*")
  next()
});

// Importing Schema
const ShortUrlSchema = require('./models/short-url-schema')

/**********************
 * Example get method *
 **********************/

app.get('/shorturl', async function(req, res) {
  const shortUrls = await ShortUrlSchema.find()
  console.log(shortUrls)

  let urlArray = []
  let redirectUrl = ''
  // let i =0;
  function urlMapper(dataArray){

      dataArray.forEach(e => {
        // i++
          redirectUrl = `${req.protocol}://${req.headers.host}/${process.env.ENV}${req.url}/${e.short}`;
          // console.log(i, redirectUrl)
          Object.assign(e, {newUrl: redirectUrl})
          // console.log('Obj',e)
          urlArray.push({
            id: e._id,
            full: e.full,
            short: e.short,
            clicks: e.clicks,
            newUrl: redirectUrl
          })
      });

      return urlArray
  }
  urlMapper(shortUrls)
  // console.log('shortUrls', shortUrls)
  // console.log('urlArray', urlArray)
  res.json(urlArray)
});

app.get('/shorturl/:redirecturl', async function(req, res) {

  const shortUrl = await ShortUrlSchema.findOne({short: req.params.redirecturl})
  console.log("Pass 1")
  if(shortUrl == null) return res.sendStatus(404)
  console.log("Pass 2")
  console.log('Clicks 1 ',shortUrl.clicks)
  shortUrl.clicks++
  console.log('Clicks 2 ',shortUrl.clicks)
  shortUrl.save()
  console.log('Clicks 3 ',shortUrl.clicks)
  res.redirect(shortUrl.full)
  // console.log(`${req.protocol}://${req.headers.host}/${process.env.ENV}/${req.url}`)
  // res.json({redirectedUrl: `${req.protocol}://${req.headers.host}/${process.env.ENV}${req.url}`})
});

/****************************
* Example post method *
****************************/

app.post('/shorturl', async function(req, res) {
  // Add your code here
  console.log({success: `Full URL = ${req}`,  url: req.url, body: req.body})
  // res.json({success: `Full URL = ${req}`,  url: req.url, body: req.body})
  await ShortUrlSchema.create({full: req.body.fullUrlLink})
  res.sendStatus(200)
});

// app.post('/shorturl/redirecturl', async function(req, res) {
//   console.log({success: `Full URL = ${req}`,  url: req.url, body: req.body})
//   // console.log('Redirect URL = ', req)
//   // res.json({success: 'get call succeed!',  url: req.url, body: req.body});

//   const shortUrl = await ShortUrlSchema.findOne({short: req.body.redirect});
//   console.log(shortUrl)
//   if(shortUrl == null) return res.sendStatus(404)

//   shortUrl.clicks++
//   // shortUrl.save()
//   res.redirect(shortUrl.full)
// });

/****************************
* Example put method *
****************************/

// app.put('/shorturl', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

// app.put('/shorturl/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'put call succeed!', url: req.url, body: req.body})
// });

// /****************************
// * Example delete method *
// ****************************/

// app.delete('/shorturl', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });

// app.delete('/shorturl/*', function(req, res) {
//   // Add your code here
//   res.json({success: 'delete call succeed!', url: req.url});
// });

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
