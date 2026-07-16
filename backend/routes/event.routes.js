import express from 'express';
import eventCtrl from '../controllers/event.controller.js';
import {
    validateEventCreate,
    validateEventUpdate,
    validateEventId
} from '../middleware/event.validation.js';

const router = express.Router();

const loadEvent = (req, res, next) => {
    eventCtrl.eventByID(req, res, next, req.params.eventId);
};

router.route('/api/events')
    .post(validateEventCreate, eventCtrl.create)
    .get(eventCtrl.list);

router.route('/api/events/:eventId')
    .all(validateEventId, loadEvent)
    .get(eventCtrl.read)
    .put(validateEventUpdate, eventCtrl.update)
    .delete(eventCtrl.remove);

export default router;