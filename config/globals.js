require('dotenv').config();


module.exports = {
    PORT: process.env.PORT || 8000,
    NODE_ENV: process.env.NODE_ENV,
    MONGO_URI:process.env.MONGO_URI
}