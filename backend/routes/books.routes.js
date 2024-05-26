const express = require('express')
const { getAllBooks, getOneBook, getSearchResult, getBookGenre } = require('./books.controller')

const bookRouter = express.Router()

bookRouter.get('/books',getAllBooks)

bookRouter.get('/book/:bookId',getOneBook)

bookRouter.get('/books/search',getSearchResult)

bookRouter.get('/books/genre',getBookGenre)

module.exports = {
    bookRouter
}