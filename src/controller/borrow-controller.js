import borrowService from "../service/borrow-service.js";

const borrow = async (req, res, next) => {
    try {
        const token = req.get("Authorization")
        const book = await borrowService.borrow(token, req.params.bookId)

        res.status(200).send({
            data: book
        })
    } catch (e) {
        next(e)
    }
}

const returned = async (req, res, next) => {
    try {
        const token = req.get("Authorization")
        const book = await borrowService.returned(token, req.params.bookId)

        res.status(200).send({
            data: book
        })
    } catch (e) {
        next(e)
    }
}

export default {
    borrow,
    returned
}