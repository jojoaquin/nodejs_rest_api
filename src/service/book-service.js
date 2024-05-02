import {prismaClient} from "../application/database.js";
import validate from "../schema/validation.js";
import {createSchema, updateSchema} from "../schema/book-schema.js";
import ErrorResponse from "../error/error-response.js";
import moment from "moment";
import * as path from "node:path";
import * as fs from "node:fs/promises";

const isTitleUsed = async (title) => {
    const book = await prismaClient.book.findFirst({
        where: {
            title: title
        }
    })

    if (book) {
        throw new ErrorResponse(400, "Book title is already used")
    }
}

const getRightDate = (releasedDateParams) => {
    let releasedDate = new Date(releasedDateParams);
    releasedDate.setHours(releasedDate.getHours() + 7);
    return releasedDate
}

const imageValidation = (imgFile) => {
    if(!imgFile) {
        throw new ErrorResponse(400, "Image is required")
    }
    const imgExt = imgFile.image.name.split(".")
    const allowedExt = ["jpg", "png", "jpeg"]
    console.info(imgExt[imgExt.length - 1])
    if(!allowedExt.includes(imgExt[imgExt.length - 1])) {
        throw new ErrorResponse(400, "Image extension must be jpg | png | jpeg")
    }
}

const create = async (request, imgFile) => {
    const bookRequest = validate(createSchema, request)

    imageValidation(imgFile)

    await isTitleUsed(bookRequest.title)

    const date = moment().format("D_MM_YYYY_h:mm:ss_a")
    let imgName = bookRequest.title.replace(/ /g, "-").toLowerCase() + "_" + date

    const imgExt = imgFile.image.name.split(".")
    imgName = imgName + "." + imgExt[imgExt.length - 1]

    const releasedDate = getRightDate(bookRequest.releasedDate)

    await imgFile.image.mv(path.resolve() + "/books-images/" + imgName)

    return prismaClient.book.create({
        data: {
            image: imgName,
            title: bookRequest.title,
            author: bookRequest.author,
            description: bookRequest.description,
            pages: bookRequest.pages,
            releasedDate: releasedDate
        }
    })

}

const getAll = async (page) => {
    const totalCount = await prismaClient.book.count()
    const totalPage = Math.ceil(totalCount / 10)
    const realPage = page ?? 1

    return [await prismaClient.book.findMany({
        skip: (realPage - 1) * 10,
        take: 10
    }), totalPage]
}

const deleteById = async (bookId) => {
    const book = await prismaClient.book.count({
        where: {
            id: bookId
        }
    })

    if (book === 1) {
        return prismaClient.book.delete({
            where: {
                id: bookId
            }
        })
    } else {
        throw new ErrorResponse(404, "Book is not found")
    }
}

const updateById = async (request, bookId) => {
    const bookRequest = validate(updateSchema, request)

    const book = await prismaClient.book.count({
        where: {
            id: bookId
        }
    })

    if (book === 1) {
        await isTitleUsed(bookRequest.title)

        const releasedDate = await getRightDate(bookRequest.releasedDate)

        return prismaClient.book.update({
            where: {
                id: bookId
            },
            data: {
                title: bookRequest.title,
                author: bookRequest.author,
                description: bookRequest.description,
                pages: bookRequest.pages,
                releasedDate: releasedDate
            }
        })
    } else {
        throw new ErrorResponse(404, "Book is not found")
    }
}

const getById = async (bookId) => {
    const book = await prismaClient.book.findUnique({
        where: {
            id: bookId
        }
    })

    if (!book) {
        throw new ErrorResponse(404, "Book is not found")
    }
    return book;
}

const deleteImageForUpdate = async (bookId) => {
    const book = await prismaClient.book.findUnique({
        where: {
            id: bookId
        },
        select: {
            title: true,
            image: true
        }
    })

    if (!book) {
        throw new ErrorResponse(404, "Book is not found")
    }

    try {
        await fs.unlink(path.resolve() + "/books-images/" + book.image)

        return book
    } catch (e) {
        throw new ErrorResponse(404, "Book image is not found")
    }
}

const updateImageById = async (bookId, request, imgFile) => {
    imageValidation(imgFile)

    const book = await deleteImageForUpdate(bookId)

    const now = moment().format("D_MM_YYYY_h:mm:ss_a")
    let imgName = book.title.replace(/ /g, "-").toLowerCase() + "_" + now

    const imgExt = imgFile.image.name.split(".")
    imgName = imgName + "." + imgExt[imgExt.length - 1]


    await imgFile.image.mv(path.resolve() + "/books-images/" + imgName)

    return prismaClient.book.update({
        where: {
            id: bookId
        },
        data: {
            image: imgName
        }
    })

}

export default {
    create,
    getAll,
    deleteById,
    updateById,
    getById,
    updateImageById
}