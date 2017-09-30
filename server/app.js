import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './src/routes/routes';

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
router(app);
app.all('*', (req, res) => {
  res.status(404)
    .send("The page you requested doesn't exist");
});

export default app;

