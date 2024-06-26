const axios = require("axios")
const { API_KEY } = require('../constant')

async function getSearchData(query) {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    return response.data
}


async function getOneBookData(bookId) {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
        return response.data
    }
    catch (err) {
        return "Error in finding book data"
    }

}

async function getUserBookData(accessToken, shelfId) {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/volumes`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return response.data;
    }
    catch (err) {
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
        console.log(response)
        return response.data;
    } catch (err) {
        console.error('Error adding new book:', err);
    }
}
async function removeBookData(accessToken, shelfId, volumeId) {
    try {
        const response = await axios.post(
            `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/removeVolume?key=${API_KEY}`,
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
        console.error('Error removing new book:');
    }
}

async function getGenreBookData(genre) {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=+subject=${genre}`)

        return response.data;
    }
    catch (err) {
        return null
    }
}

module.exports = {
    getSearchData,
    getOneBookData,
    getUserBookData,
    addNewBookData,
    removeBookData,
    getGenreBookData
}