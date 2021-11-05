export const timeFromTimestamp = (timestamp) => {
    const postedDate = new Date(parseInt(timestamp));
    const dateNow = new Date();
    const yearDiff = dateNow.getFullYear() - postedDate.getFullYear();

    if (yearDiff === 0) {
        const dayDiff = dateNow.getDay() - postedDate.getDay();
        if (dayDiff === 0) {
            const hourDiff = dateNow.getHours() - postedDate.getHours();
            if (hourDiff === 0) {
                const minutesDiff =
                    dateNow.getMinutes() - postedDate.getMinutes();
                if (minutesDiff >= 0 && minutesDiff < 5) {
                    return "1 минуту назад";
                }
                if (minutesDiff >= 5 && minutesDiff < 10) {
                    return "5 минуту назад";
                }
                if (minutesDiff >= 10 && minutesDiff < 30) {
                    return "10 минут назад";
                }
                return "30 минут назад";
            }
            return ` ${postedDate.getHours()}:${postedDate.getMinutes()}`;
        }
        return ` ${postedDate.getDay()} ${postedDate.toLocaleString("default", {
            month: "long"
        })}`;
    }
    return (
        postedDate.getFullYear() +
        "." +
        (postedDate.getMonth() + 1) +
        "_" +
        postedDate.getDate()
    );
};
