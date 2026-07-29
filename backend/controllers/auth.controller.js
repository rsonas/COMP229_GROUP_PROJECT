import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import config from '../config/config.js';


const register = async (req, res) => {

    try {

        const { username, email, password } = req.body;

        // Check if email already exists
        const existingEmail = await User.findOne({ email });

        if (existingEmail) {
            return res.status(400).json({
                message: "Email already exists"
            });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return res.status(400).json({
                message: "Username already exists"
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
                username: user.username,                email: user.email
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

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.json(user);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (username && username !== user.username) {

            const existingUsername = await User.findOne({ username });

            if (existingUsername) {
                return res.status(400).json({
                    message: "Username already exists"
                });
            }

            user.username = username;
        }

        if (email && email !== user.email) {

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }

            user.email = email;
        }

        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        res.json({
            message: "Profile updated successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export default {
    register,
    login,
    getProfile,
    updateProfile
};
