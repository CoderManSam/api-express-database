const express = require('express')
const router = express.Router()
const db = require("../../db");
const { getAllBooks, postNewBook, getBookById, updateBookById, deleteBookById } = require("../domain/booksRepository")

router.get('/', async (req, res) => {

    const allBooks = await getAllBooks(req.query)

    // let sqlQuery = 'select * from books'
    // const params = []

    // if (req.query.type) {
    //     sqlQuery += ' WHERE type = $1'
    //     params.push(req.query.type)
    // }

    // if (req.query.topic) {
    //     sqlQuery += ' WHERE topic = $1'
    //     params.push(req.query.topic)
    // }

    // const qResult = await db.query(sqlQuery, params)

    res.json({
        books: allBooks
    })
})

router.post('/', (req,res) => {

    const {title, type, author, topic, publicationDate, pages} = req.body

    if(!title || !type || !author || !topic || !publicationDate || !pages) {
        return res.status(400).json({error: "Missing fields in request body"})
    }

    // let sqlQuery = 'INSERT INTO books (title, type, author, topic, publicationDate, pages) VALUES($1, $2, $3, $4, $5, $6)'
    // const values = [title, type, author, topic, publicationDate, pages]

    // db.query(sqlQuery, values)

    postNewBook(req.body)

    const newBook = {...req.body, id: 0}
  
    res.status(201).json({"book": newBook})
})

router.get('/:id', async (req, res) => {
    // let sqlQuery = 'select * from books WHERE id = $1'

    // const {id} = req.params
    // const idAsNumber = Number(id)

    // const params = [idAsNumber]

    // const qResult = await db.query(sqlQuery, params)

    const book = await getBookById(req.params)

    res.json({
        book: book
    })
})

router.put('/:id', async (req, res) => {
    // let sqlQuery = 'UPDATE books SET title = $2, type = $3, author = $4, topic = $5, publicationDate = $6, pages = $7 WHERE id = $1 RETURNING *;'

    // const {id} = req.params
    // const idAsNumber = Number(id)

    // const {title, type, author, topic, publicationDate, pages} = req.body
    // const pagesAsNumber = Number(pages)

    // const params = [idAsNumber, title, type, author, topic, publicationDate, pagesAsNumber]

    // const qResult = await db.query(sqlQuery, params)

    const book = await updateBookById(req.params, req.body)

    res.status(201).json({
        book: book
    })
})

router.delete('/:id', async (req, res) => {
    // let sqlInitialQuery = 'SELECT * from books WHERE id = $1;'

    // let sqlQuery = 'DELETE FROM books WHERE id = $1;'

    // const {id} = req.params
    // const idAsNumber = Number(id)

    // const params = [idAsNumber]

    // const qInitialResult = await db.query(sqlInitialQuery, params)

    // await db.query(sqlQuery, params)

    const book = await deleteBookById(req.params)

    res.status(201).json({
        book: book
    })
})

module.exports = router
