import express from "express";
import {kong, pong} from "./controller/_check-controller.js";
import userController from "./controller/user-controller.js";
import authMiddleware from "./middleware/auth-middleware.js";

const publicRouter = express.Router()

publicRouter.get("/ping", pong)
publicRouter.post("/register", userController.register)
publicRouter.post("/login", userController.login)


const userRouter = express.Router()
userRouter.use(await authMiddleware)

userRouter.get("/king", kong)

export {
    publicRouter,
    userRouter
}