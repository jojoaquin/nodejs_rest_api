import express from "express";
import errorMiddleware from "../middleware/error-middleware.js";
import {publicRouter, userRouter} from "../router.js";

const web = express()
web.use(express.json())

web.use(publicRouter)
web.use(userRouter)

web.use(errorMiddleware)

export default web