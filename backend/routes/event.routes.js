import express from 'express';
import eventCtrl from '../controllers/event.controller.js';

const router = express.Router();

router.route('/api/events')
    .post(eventCtrl.create)
    .get(eventCtrl.list);

router.route('/api/events/:eventId')
    .get(eventCtrl.read)
    .put(eventCtrl.update)
    .delete(eventCtrl.remove);

router.param('eventId', eventCtrl.eventByID);

export default router;