const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();

const rootPath = __dirname.substr(0, __dirname.length - 'server'.length);
const proxyConfig = JSON.parse(fs.readFileSync(`${rootPath}/config/production.proxy.json`));
const proxyUrl = proxyConfig['/quote'].target + '/quote';
const axios = require('axios');


// log middleware
app.use(function (req, res, next) {
  console.log(`request url: ${req.url}`);
  next();
});

// static files
app.use(express.static(path.join(__dirname.substr(0, __dirname.length - 'server'.length), '/dist/quotes-frontend')));

// backend API
app.use('/quote', (req, res) => {
  axios.get(proxyUrl)
    .then(backendResponse => res.send(backendResponse.data));
});

const PORT = process.env.PORT || 3001;	//process.env.PORT is used by heroku
app.listen(PORT,
  () => console.log(`server listening on port ${PORT}`)
);
