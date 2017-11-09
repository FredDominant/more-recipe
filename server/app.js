import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';

import router from './src/routes/routes';
import webpackConfig from '../webpack.config';

const app = express();
const compiler = webpack(webpackConfig);
app.use(webpackMiddleware(compiler));
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* app.get('/*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
}); */
router(app);
app.all('*', (req, res) => {
  res.status(404)
    .send("The page you requested doesn't exist");
});


export default app;

