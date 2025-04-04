const jwt = require('jsonwebtoken');

const SignToken = (payload) => {
    const token = jwt.sign(payload, process.env.SECRECT, {
        expiresIn: '7d',
    });

    return token;
}


module.exports = {
    SignToken
};