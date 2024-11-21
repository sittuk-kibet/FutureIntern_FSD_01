const db = require('../config/db');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require ('express-validator');// for input validation
const jwt = require('jsonwebtoken');


///user registration function
exports.registerUser = [
    //input validation middleware
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('invalid email'),
    body('password')
    .isLength({ min: 8}).withMessage('Password must be at least 8 characters')
    .matches(/[a-z]/).withMessage('Password must contain a lowercase letter')
    .matches(/[A-Z]/).withMessage('Password must contain a uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain a numbers '),

    async (req, res) => {
        const {name, email, password} = req.body;
        


        ///validate request input
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
        try {
            // Normalize email to ensure consistency (case insensitive check)
            const nomarlizedEmail = email.toLowerCase();
            //check if the user exist in the database
            const [row] = await db.execute('SELECT * FROM users WHERE email=?', [nomarlizedEmail]);
            if (row.length > 0){
                return res.status(400).json({message: 'User already exist'});
            }
            // hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            /// Insert the user record into the database
            await db.execute(
                'Insert INTO users (name,email,password) VALUES(?,?,?)'
                [name, nomarlizedEmail, hashedPassword]

            );
            res.status(201).json({message: 'User registered successfully.'});

        } catch (error) {
            console.error('Error during registration:', error)// log error for debugging purposes
            res.status(500).json({message: 'An error occured!'});
            
        }
        
    }


];

//User Login
exports.loginUser = [
    body('email').isEmail().withMessage('Invalid email Format'),
    body('password').notEmpty().withMessage('Password'),

    async(req,res) => {
        const {email, password} = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }


        try {
            const nomarlizedEmail = email.toLowerCase();
            const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [normalizedEmail]);
            if (rows.length === 0) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            const user = rows[0];
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid email or password' });
            }
            //Generate jwt
            const token = jwt.sign({ id: user.id, name: user.name }, process.env.SESSION_SECRET, {
                expiresIn: '1h',
            });

            res.status(200).json({ message: 'Login successful', token });


            
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'An error occurred!' });
        }
    }
    

];

//User Logout
exports.logoutUser = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error('Error during logout:', err);
                return res.status(500).json({ message: 'Failed to log out' });
            }
            res.clearCookie('user_sid');
            res.status(200).json({ message: 'Logout successful' });
        });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'An error occurred!' });
    }
};
