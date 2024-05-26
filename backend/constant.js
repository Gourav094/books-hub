require('dotenv').config();

const API_KEY = process.env.API_KEY;

// const CLIENT_URL = "https://books-hub03.vercel.app"
// const backend_URL = "https://books-hub-3k1r.onrender.com"
const CLIENT_URL = "http://localhost:5173"

module.exports = {
    API_KEY,
    CLIENT_URL,
};
