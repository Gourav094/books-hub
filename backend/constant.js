require('dotenv').config();

const API_KEY = process.env.API_KEY;

const CLIENT_URL = "http://localhost:5173"

module.exports = {
    API_KEY,
    CLIENT_URL
};
