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