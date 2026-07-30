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


// Event collection routes
// POST: Create a new event (authenticated users only)
// GET: View all events (public access)
router.route('/api/events')
    .post(authMiddleware, validateEventCreate, eventCtrl.create)
    .get(eventCtrl.list);


// Individual event routes
// GET: View one event
// PUT: Update event details/status (authenticated users only)
// DELETE: Cancel event instead of permanently deleting
router.route('/api/events/:eventId')
    .all(validateEventId, loadEvent)
    .get(eventCtrl.read)
    .put(authMiddleware, validateEventUpdate, eventCtrl.update)
    .delete(authMiddleware, eventCtrl.remove);


export default router;