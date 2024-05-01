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

export default {
    create
}