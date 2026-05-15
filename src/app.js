const express = require('express');
const cookieParser = require('cookie-parser')
const authRoutes = require('./routes/auth.routes.js')
const musicRoutes = require('./routes/music.routes.js')
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

//auth api's
app.use('/api/auth',authRoutes)
//handeling role based access
app.use('/api/music',musicRoutes)
module.exports = app;