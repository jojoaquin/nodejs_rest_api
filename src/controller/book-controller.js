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

export default {
    create,
    getAllBooks
}