import bookService from "../service/book-service.js";

const create = async (req, res, next) => {
    try {
        const book = await bookService.create(req.body, req.files)

        res.status(200).send({
            data: book
        })
    } catch (e) {
        next(e)
    }
}

const getAllBooks = async (req, res, next) => {
    try {
        const [books, totalPage] = await bookService.getAll(req.query.page)

        res.status(200).send({
            data: books,
            totalPages: totalPage,
            limit: 10
        })
    } catch (e) {
        next(e)
    }
}

const deleteById = async (req, res, next) => {
    try {
        const book = await bookService.deleteById(req.params.bookId)

        res.status(200).send({
            "message": `Book with id ${req.params.bookId} is deleted`
        })
    } catch (e) {
        next(e)
    }
}

const updateById = async (req, res, next) => {
    try {
        const book = await bookService.updateById(req.body, req.params.bookId)

        res.status(200).send({
            data: book
        })
    } catch (e) {
        next(e)
    }
}

const getById = async (req, res, next) => {
    try {
        const book = await bookService.getById(req.params.bookId)

        res.status(200).send({
            data: book
        })
    } catch (e) {
        next(e)
    }
}

const updateImageById = async (req, res, next) => {
    try {
        const book = await bookService.updateImageById(req.params.bookId, req.body, req.files)

        res.status(200).send({
            data: book
        })
    } catch (e) {
        next(e)
    }
}

export default {
    create,
    getAllBooks,
    deleteById,
    updateById,
    getById,
    updateImageById
}