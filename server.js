/*
    Aislinn Richardson  301146892
    Fatima Dabbous      301368242
    Omer Yousif         30109346
    Hashi Mohamed       300787311
    Ahmed Yafeai        301509099
    Tahseen Ahmed       301544487

    ======= SportsPass =======

    Launches server and connects to database

*/

import 'dotenv/config'
import app from './backend/express.js'
import config from './backend/config/config.js'
import mongoose from 'mongoose'

//connect to db
mongoose.connect(config.mongoUri)
    .then(() => console.log("Connected to database"))

mongoose.connection.on('error', () => {
    throw new Error(`Unable to connect to database: ${config.mongoUri}`);
})

//launch server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.json({
        message: "Backend launched successfully!",
        status: "Online",
        endpoints: [
            "/api/auth/register",
            "/api/auth/login",
            "/api/events"
        ]
    });
});
