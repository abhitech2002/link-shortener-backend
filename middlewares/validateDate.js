const validateDate = (date) => {
    try {
        const parsedDate = new Date(date);
        if (!date) {
            return false;
        }
        return !isNaN(parsedDate.getTime());

    } catch (error) {
        return false
    }
}

module.exports = validateDate;
