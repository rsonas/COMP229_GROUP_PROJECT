/*
    Aislinn Richardson  301146892
    Fatima Dabbous      301368242
    Omer Yousif         30109346
    Hashi Mohamed       300787311
    Ahmed Yafeai        301509099
    Tahseen Ahmed       301544487

    ======= SportsPass =======

    Stores environment settings and config values

*/

const config = {

        env: process.env.NODE_ENV || 'development',
        port: process.env.PORT || 3000,
        jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
        mongoUri: process.env.MONGODB_URI
};

export default config;