import express from 'express';
import eventCtrl from '../controllers/event.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

import {
    validateEventCreate,
    validateEventUpdate,
    validateEventId
} from '../middleware/event.validation.js';

const router = express.Router();

const loadEvent = (req, res, next) => {
    eventCtrl.eventByID(req, res, next, req.params.eventId);
};

// Create event (requires login)
// List events (public)
router.route('/api/events')
    .post(authMiddleware, validateEventCreate, eventCtrl.create)
    .get(eventCtrl.list);

// Read, update, delete individual event
router.route('/api/events/:eventId')
    .all(validateEventId, loadEvent)
    .get(eventCtrl.read)
    .put(authMiddleware, validateEventUpdate, eventCtrl.update)
    .delete(authMiddleware, eventCtrl.remove);

export default router;