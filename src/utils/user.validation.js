const validateuser = (value, type) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    switch (type) {
        case 'email':
            return emailRegex.test(value);

        case 'password':
            return passwordRegex.test(value);

        case 'name':
            return value.length > 3
        default:
            return true;
    }
}

module.exports = {
    validateuser
}