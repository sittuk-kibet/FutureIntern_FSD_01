//import the packages
const express = require('express');
const { configDotenv } = require('dotenv');
const session = require('express-session');
//@ts-ignore
const MYSQLStore = require('express-mysql-session')(session);
const path = require('path');
require('dotenv').config();

const db = require('./config/db');


const authRoutes = require('./routes/auth'); //import auth routes

//initialize server

const app = express();

// set up middleware 
app.use(express.json()); //middleware to parse JSON request body

//configure session store
const sessionStore = new MYSQLStore({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

//set up session
app.use(
    session({
        key: 'user_sid',
        secret: process.env.SESSION_SECRET, // Secret key for signing session cookies
        resave: false,
        saveUninitialized: false,
        store: sessionStore, //use mysql as session store
    })
);


// Serve static files 
app.use(express.static(path.join(__dirname)));


//fix route declaration
app.get('/auth', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//Auth routes
app.use('/auth', authRoutes);

//Start the server
const port = process.env.PORT || 3000;
app.listen(port,() => {
    console.log(`Server is running on http://localhost:${port}`);
});
