/*
    Aislinn Richardson  301146892
    Fatima Dabbous      301368242
    Omer Yousif         30109346
    Hashi Mohamed       300787311
    Ahmed Yafeai        301509099
    Tahseen Ahmed       301544487

    ======= SportsPass =======

    Defines API endpoints for viewing, creating, updating, and cancelling events

*/

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

    router.route("/api/auth/profile")
    .put(authMiddleware, authCtrl.updateProfile);

export default router;