/*
    Aislinn Richardson  301146892
    Fatima Dabbous      301368242
    Omer Yousif         30109346
    Hashi Mohamed       300787311
    Ahmed Yafeai        301509099
    Tahseen Ahmed       301544487

    ======= SportsPass =======

    Displays when a user does not have access to a specific page

*/

const Unauthorized = () => {
    return (
        <div className="container mt-5 text-center">

            <h2>Unauthorized</h2>

            <p>
                You do not have permission to view this page.
            </p>

        </div>
    );
};

export default Unauthorized;