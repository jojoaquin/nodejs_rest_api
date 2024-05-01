import express from "express";
import {kong, pong} from "./controller/_check-controller.js";
import userController from "./controller/user-controller.js";
import authMiddleware from "./middleware/auth-middleware.js";
import expressFileUpload from "express-fileupload"
import bookController from "./controller/book-controller.js";

const publicRouter = express.Router()

publicRouter.get("/ping", pong)

publicRouter.post("/register", userController.register)
publicRouter.post("/login", userController.login)


const userRouter = express.Router()
userRouter.use(authMiddleware)
userRouter.use(express.urlencoded({extended: false}))
userRouter.use(expressFileUpload())

userRouter.get("/king", kong)

userRouter.post("/create-book", bookController.create)
userRouter.get("/books", bookController.getAllBooks)

export {
    publicRouter,
    userRouter
}
