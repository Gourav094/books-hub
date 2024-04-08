const express = require('express')
const { getAllBooks, getOneBook, getSearchResult } = require('./books.controller')

const bookRouter = express.Router()

bookRouter.get('/books',getAllBooks)

bookRouter.get('/book/:bookId',getOneBook)

bookRouter.get('/books/search',getSearchResult)

module.exports = {
    bookRouter
}