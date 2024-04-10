const axios = require("axios")
async function tokenExpired(token) {
    try {
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${token}`);
        console.log(response.data);

        if (response.data.error && response.data.error === "invalid_token") {
            return true; 
        } else {
           
            if (response.data.expires_in && response.data.expires_in <= 0) {
                return true; 
            } else {
                return false; 
            }
        }
    } catch (error) {
        console.error("Error checking token expiration:", error);
        return true;
    }
}

module.exports = tokenExpired