import ErrorResponse from "../error/error-response.js";

const errorMiddleware = (err, req, res, next) => {
    if (err instanceof ErrorResponse) {
        res.send({
            status: err.status,
            message: err.message
        })
    } else {
        next()
    }
}

export default errorMiddleware