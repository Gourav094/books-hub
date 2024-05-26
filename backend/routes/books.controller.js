const { getSearchData, getOneBookData, getGenreBookData } = require("../models/books.model")

function getAllBooks(req,res) {
    res.send('here you will shown all the book data')
}

async function getOneBook(req,res) {
    const bookId = req.params.bookId
    const bookData = await getOneBookData(bookId) 
    if(!bookData){
        return res.status(400).json({
            error:"error during fetching data for particular book"
        })
    }
    return res.status(200).json({
        data:bookData
    })
}

async function getSearchResult(req,res){
    const query = req.query.q
    const data =await getSearchData(query)
    if(!data){
        res.status(400).json({
            error:"Error encounterd in fetching search result"
        })
    }
    res.status(200).json({
        data:data.items
    })
}

async function getBookGenre(req,res){
    const genre = req.query.q
    const genreBooks = await getGenreBookData(genre)

    if(!genreBooks){
        return res.status(400).json({
            error:"Error occurred during finding genre"
        })
    }
    res.status(200).json({
        genreBooks
    })
}

module.exports = {
    getAllBooks,
    getOneBook,
    getSearchResult,
    getBookGenre
}