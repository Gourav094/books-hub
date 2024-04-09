const express = require('express')
const { getUserBookShelf, addNewBook } = require('./user.controller')

const userBooksRouter = express.Router()

userBooksRouter.get('/bookshelf/:shelfId', getUserBookShelf)

userBooksRouter.post('/add/book/:shelfId/',addNewBook)

module.exports = {
    userBooksRouter
}