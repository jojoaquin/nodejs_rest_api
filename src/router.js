import express from "express";
import {kong, pong} from "./controller/_check-controller.js";
import userController from "./controller/user-controller.js";
import authMiddleware from "./middleware/auth-middleware.js";
import expressFileUpload from "express-fileupload"
import bookController from "./controller/book-controller.js";
import borrowController from "./controller/borrow-controller.js";

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
userRouter.delete("/delete-book/:bookId", bookController.deleteById)
userRouter.put("/update-book/:bookId", bookController.updateById)
userRouter.get("/book/:bookId", bookController.getById)
userRouter.put("/update-book/image/:bookId", bookController.updateImageById)

userRouter.post("/borrow/:bookId", borrowController.borrow)
userRouter.post("/return/:bookId", borrowController.returned)

export {
    publicRouter,
    userRouter
}
