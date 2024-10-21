const express = require('express');
const path = require('path');
const connectDB = require('./config/database');
const UserController = require('./adapters/in/UserController');

const app = express();
app.use(express.json());
app.use('/pdfs', express.static(path.join(__dirname, 'adapters', 'pdfs')));


connectDB();


app.post('/users', UserController.createUserAndDownloadPDF);
app.get('/users/:id', UserController.getUser);
app.get('/users', UserController.listUsers);

module.exports = app;
