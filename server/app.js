import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import path from 'path';
import webpackMiddleware from 'webpack-dev-middleware';

import router from './src/routes/routes';
import webpackConfig from '../webpack.config';
import webpackProduction from '../webpack.prod';

const app = express();
if (process.env.NODE_ENV === 'production') {
  const productionCompiler = webpack(webpackProduction);
  app.use(webpackMiddleware(productionCompiler));
} else {
  const developmentCompiler = webpack(webpackConfig);
  app.use(webpackMiddleware(developmentCompiler));
  app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, '../client/assets')));
router(app);

app.get('/api/documentation', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/assets/doc/index.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.all('*', (req, res) => {
  res.status(404)
    .send("The page you requested doesn't exist");
});


export default app;

