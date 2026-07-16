import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import config from '../config/config.js';


const register = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = new User({
            username,
            email,
            password: hashedPassword
        });


        await user.save();


        res.status(201).json({
            message: 'User registered successfully'
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};



const login = async (req, res) => {

    try {

        const { email, password } = req.body;


        const user = await User.findOne({ email });


        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }


        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (!passwordMatch) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }


        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            config.jwtSecret,
            {
                expiresIn: '1h'
            }
        );


        res.json({
            message: 'Login successful',
            token
        });


    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


export default {
    register,
    login
};