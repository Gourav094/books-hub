const express = require('express')
const { getUserBookShelf, addNewBook, removeBook } = require('./user.controller')

const userBooksRouter = express.Router()

userBooksRouter.get('/bookshelf/:shelfId', getUserBookShelf)

userBooksRouter.post('/add/book/:shelfId/',addNewBook)

userBooksRouter.post('/remove/book/:shelfId',removeBook)

module.exports = {
    userBooksRouter
}