  
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import {default as engine} from 'ejs-mate';

import indexRouter from './routes/index';
import usersRouter from './routes/users';

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
// view
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views')

app.use('/', indexRouter);
app.use('/users', usersRouter);

export default app;