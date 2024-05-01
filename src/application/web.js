import express from "express";
import errorMiddleware from "../middleware/error-middleware.js";
import {publicRouter, userRouter} from "../router.js";
import expressFileUpload from "express-fileupload";

const web = express()
web.use(express.json())

web.use("/images", express.static("books-images"))

web.use(publicRouter)
web.use(userRouter)

web.use(errorMiddleware)

export default web