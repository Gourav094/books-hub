const axios = require("axios")
async function tokenExpired(token) {
    try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`);

        if (response.data.error && response.data.error === "invalid_token") {
            return true; 
        } else {
            return false;
        }
    } catch (error) {
        return true;
    }
}

module.exports = tokenExpired