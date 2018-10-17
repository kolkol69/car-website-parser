/* eslint-disable no-console */
const express = require('express');
const webpack = require('webpack');
const path = require('path');
const open = require('open');
const webpackConfig = require('../webpack.config.dev');
const router = require('./routes/car.routes');

const port = 3000;
const app = express();
const compiler = webpack(webpackConfig);

app.use((req, res, next) => {
  const origin = req.get('origin');

  // TODO Add origin validation
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma');

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
      res.sendStatus(204);
  } else {
      next();
  }
});

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: webpackConfig.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.use('/carsroute', router);

app.get('*', function(req, res) {
  res.sendFile(path.join( __dirname, '../src/index.html'));
});


app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open(`http://localhost:${port}`);
  }
});
