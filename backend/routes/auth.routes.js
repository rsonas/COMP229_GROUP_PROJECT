import express from 'express';
import authCtrl from '../controllers/auth.controller.js';
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();


router.route('/api/auth/register')
    .post(authCtrl.register);


router.route('/api/auth/login')
    .post(authCtrl.login);

router.route("/api/auth/profile")
    .get(authMiddleware, authCtrl.getProfile);


export default router;