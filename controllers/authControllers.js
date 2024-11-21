const db = require('../config/db');
const bcrypt = require('bcryptjs')
const { body, validationResult } = require ('express-validation');// for inout validation

///user registration function
exports.registerUser = [
    //input validation middleware
    body('name').notEmpty().withMessage('Name is required'),
    body('email').notEmpty().withMessage('invalid email'),
    body(password)
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