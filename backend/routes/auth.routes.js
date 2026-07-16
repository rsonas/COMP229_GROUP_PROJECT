import express from 'express';
import authCtrl from '../controllers/auth.controller.js';

const router = express.Router();


router.route('/api/auth/register')
    .post(authCtrl.register);


router.route('/api/auth/login')
    .post(authCtrl.login);


export default router;