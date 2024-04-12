const { default: axios } = require("axios")
const { getUserBookData, addNewBookData, removeBookData } = require("../models/books.model")

async function getUserBookShelf(req,res){
    const shelfId = req.params.shelfId
    const accessToken = req?.headers?.authorization?.split(' ')?.[1] || req.body.accessToken;
    const bookData = await getUserBookData(accessToken,shelfId) 
    res.status(200).json({
        data:bookData
    })
}

async function addNewBook(req,res){
    const shelfId = req.params.shelfId
    const volumeId = req.body.volumeId;
    // const accessToken = req.user.accessToken
    const accessToken = req?.headers?.authorization?.split(' ')?.[1] || req.body.accessToken;

    const response = await addNewBookData(accessToken,shelfId,volumeId)

    if(!response){
        return res.status(400).json({
            error:"Please login to add book"
        })
    }
    res.status(200).json({
        data:"Successfully added book to your list"
    })
}

async function removeBook(req,res) {
    const shelfId = req.params.shelfId
    const volumeId = req.body.volumeId
    const accessToken = req?.headers?.authorization?.split(' ')?.[1] || req.body.accessToken;

    const response = await removeBookData(accessToken,shelfId,volumeId)
    if(!response){
        return res.status(400).json({
            error:"Please login to remove book"
        })
    }
    res.status(200).json({
        data:"Successfully removed book from your list"
    })
} 


module.exports = {
    getUserBookShelf,
    addNewBook,
    removeBook
}