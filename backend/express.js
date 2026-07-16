import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import eventRoutes from './routes/event.routes.js';
import authRoutes from './routes/auth.routes.js';

const app = express();

// middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// routes
app.use(authRoutes);
app.use(eventRoutes);

export default app;