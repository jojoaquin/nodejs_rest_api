import ErrorResponse from "../error/error-response.js";

const pong = (req, res, next) => {
    try {
        res.send("PONG")
    } catch (e) {
        next(e)
    }
}

const kong = (req, res, next) => {
    try {
        res.send("KONG")
    } catch (e) {
        next(e)
    }
}

export {pong, kong}