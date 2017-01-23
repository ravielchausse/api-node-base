import expressValidator from 'express-validator';
import bodyParser from 'body-parser';
import consign from 'consign';
import express from 'express';
import morgan from 'morgan';
import moment from "moment";
import http from "http";

import logger from './logger';

const exp = express();

exp.use(morgan('common', {
    stream: { write: (message) => logger.info(message.replace(/\[.*\]/gi, `[${moment().format('YYYY-MM-DD HH:mm:ss')}]`)) }
}));

exp.use(express.static('app/public'));
exp.set('view engine', 'ejs');
exp.set('views', 'app/views');

exp.use(bodyParser.urlencoded({extended: true}));
exp.use(bodyParser.json());

exp.use(expressValidator());

consign()
.include('app/controllers')
.into(exp);

exp.use((request, response, next) => {
  response.status(404).render('errors/404');
  next();
  return;
});

exp.use((error, request, response, next) => {
  response.status(500).render('errors/500');
  next(error);
  return;
});

const server = http.createServer(exp);

export default server;
