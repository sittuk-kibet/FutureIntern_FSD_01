//import the packages
const express = require(express);
const { configDotenv } = require('dotenv');
const session = require('express-session');
const MYSQLStore = require('connect-mysql2')(session);
const path = require('path');
require('dotenv').config()

const db =require('./config/db')
const authRoutes = require('./routes/auth') //import auth routes

//initialize server

const app = express();

// set up middleware 
app.use(express.json()); //middleware to parse JSON request body

//set up session
app.use(
    session({
        key: 'user_sid',
        secret: 'process.env.SESSION_SECRET', //Secret key for signing session cookies
        resave: false,
        saveUninitialized: false,
        store: new MYSQLStore({}, db) //Use mysql as the session store
    })
);

//routes
app.get('/auth'), (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
};

//Auth routes
app.use('/auth', authRoutes)

//Start the server
const port = process.env.port || 3306;
app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);
});