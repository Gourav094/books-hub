const axios = require("axios")
const {API_KEY} = require('../constant')

async function getSearchData(query) {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    return response.data
}


async function getOneBookData(bookId) {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
    return response.data
}

async function getUserBookData(accessToken,shelfId) {
    try{
        const response = await axios.get(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/volumes`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    }
    catch(err){
        return "User token not valid"
    }
}

async function addNewBookData(accessToken, shelfId, volumeId) {
    try {
        const response = await axios.post(
            `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/addVolume?key=${API_KEY}`,
            {
                volumeId: volumeId
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding new book:');
    }
}

module.exports = {
    getSearchData,
    getOneBookData,
    getUserBookData,
    addNewBookData
}