const { default: axios } = require("axios")
const { getUserBookData, addNewBookData } = require("../models/books.model")

async function getUserBookShelf(req,res){
    const shelfId = req.params.shelfId
    const accessToken = req?.headers?.authorization?.split(' ')?.[1] || req.body.accessToken;
    console.log(shelfId,accessToken)
    const bookData = await getUserBookData(accessToken,shelfId) 
    res.status(200).json({
        data:bookData
    })
}

async function addNewBook(req,res){
    const shelfId = req.params.shelfId
    const volumeId = req.body.volumeId;
    // const accessToken = req.user.accessToken
    console.log(shelfId,volumeId)
    const accessToken = req?.headers?.authorization?.split(' ')?.[1] || req.body.accessToken;

    console.log(accessToken)
    const response = await addNewBookData(accessToken,shelfId,volumeId)
    if(!response){
        return res.status(400).json({
            error:"Getting error in adding new book"
        })
    }
    res.status(200).json({
        data:"Successfully added book to your list"
    })
}

module.exports = {
    getUserBookShelf,
    addNewBook
}