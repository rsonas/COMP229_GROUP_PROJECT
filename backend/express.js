/*
    Aislinn Richardson  301146892
    Fatima Dabbous      301368242
    Omer Yousif         30109346
    Hashi Mohamed       300787311
    Ahmed Yafeai        301509099
    Tahseen Ahmed       301544487

    ======= SportsPass =======

    Configures express server, middleware, database connection, and API endpoints

*/

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