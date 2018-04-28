require("dotenv").config();
const jwt = require('jsonwebtoken');
const APP_SECRET = process.env.JWT_SECRET;

function getUserId(context) {
    const Authorization = context.request.get('Authorization')
    if (Authorization) {
        const token = Authorization.replace('Bearer ', '')
        const { userId } = jwt.verify(token, APP_SECRET)
        return userId;
    }
    throw new Error('Not authenticated')
}

const comparator = (field, parser, desc=false) => (a,b) => {
    let aVal = a[parser(field)];
    let bVal = b[parser(field)];
    if (aVal < bVal)
        return desc ? 1 : -1;
    if (aVal > bVal)
        return desc ? -1 : 1;
    return 0;
}

module.exports = {
    APP_SECRET,
    getUserId,
}