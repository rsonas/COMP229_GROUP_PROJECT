/*
    Aislinn Richardson  301146892
    Fatima Dabbous      301368242
    Omer Yousif         30109346
    Hashi Mohamed       300787311
    Ahmed Yafeai        301509099
    Tahseen Ahmed       301544487

    ======= SportsPass =======

    Formats events to improve readability

*/

const formatDateTime = (date) => {
    if (!date) return "Date to be announced";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "Date to be announced";

    return new Intl.DateTimeFormat("en-CA", {
        dateStyle: "medium",
        timeStyle: "short"
    }).format(parsedDate);
};

const formatPrice = (price) => {
    const numericPrice = Number(price);

    if (!Number.isFinite(numericPrice)) return "Price unavailable";
    if (numericPrice === 0) return "Free";

    return new Intl.NumberFormat("en-CA", {
        style: "currency",
        currency: "CAD"
    }).format(numericPrice);
};

export { formatDateTime, formatPrice };