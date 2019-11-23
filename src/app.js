import express from 'express';
import compression from 'compression';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import socket from 'socket.io';
import http from 'http';
import passportManager from './config/passport';
import router from './routes';


const app = express();

const server = http.Server(app);
const io = socket(server);
const screen = io.of('/screen');


// Middleware
 
app.use(function(req, res, next){
  res.io = io;
  res.screen = screen;
  next();
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


app.use('/',router);

app.use(passportManager.initialize());

io.on('connection', (socket) => {
  console.log('a user connected');
});
screen.on('connection', (socket) => {
  console.log('screen connected');
});


export {app, server};
