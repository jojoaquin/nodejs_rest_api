import {prismaClient} from "../application/database.js";
import validate from "../schema/validation.js";
import {createSchema} from "../schema/book-schema.js";
import ErrorResponse from "../error/error-response.js";
import moment from "moment";
import * as fs from "node:fs/promises";
import {request} from "express";

const isTitleUsed = async (bookRequest) => {
    const book = await prismaClient.book.findFirst({
        where: {
            title: bookRequest.title
        }
    })

    if(book) {
        throw new ErrorResponse(400, "Book title is already used")
    }
}

const getRightDate = (bookRequest) => {
    let releasedDate = new Date(bookRequest.releasedDate);
    releasedDate.setHours(releasedDate.getHours() + 7);
    return releasedDate
}

const create = async (request, imgFile) => {
    const bookRequest = validate(createSchema, request)

    if(!imgFile) {
        throw new ErrorResponse(400, "Image is required")
    }


    await isTitleUsed(bookRequest)

    const date = moment().format("D_MM_YYYY_h:mm:ss_a")
    let imgName = bookRequest.title.replace(/ /g, "-").toLowerCase() + "_" + date

    const imgExt = imgFile.image.name.split(".")
    imgName = imgName + "." + imgExt[imgExt.length - 1]

    const releasedDate = getRightDate(bookRequest)

    await imgFile.image.mv("/Users/joaquin/Documents/Developments/node-js/rest-api/src/books-images/" + imgName)

    return prismaClient.book.create({
        data: {
            image: imgName,
            title: bookRequest.title,
            author: bookRequest.author,
            description: bookRequest.description,
            pages: bookRequest.pages,
            releasedDate: releasedDate
        },
        select: {
            id: true,
            image: true,
            title: true,
            author: true,
            description: true,
            pages: true,
            releasedDate: true
        }
    })

}

const getAll = async (page) => {
    const totalCount = await prismaClient.book.count()
    const totalPage = Math.ceil(totalCount / 10)

    if(page) {
        return [await prismaClient.book.findMany({
            skip: (page - 1) * 10,
            take: 10
        }), totalPage]
    } else {
        return [await prismaClient.book.findMany({
            skip: 0,
            take: 10
        }), totalPage]
    }
}


export default {
    create,
    getAll
}