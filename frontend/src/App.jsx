/*
    Aislinn Richardson  301146892
    Fatima Dabbous      301368242
    Omer Yousif         30109346
    Hashi Mohamed       300787311
    Ahmed Yafeai        301509099
    Tahseen Ahmed       301544487

    ======= SportsPass =======

    Defines structure of application

*/

import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
    return (
        <>
            <Navbar />
            <AppRoutes />
        </>
    );
}

export default App;