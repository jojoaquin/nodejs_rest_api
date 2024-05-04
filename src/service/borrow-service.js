import {prismaClient} from "../application/database.js";
import ErrorResponse from "../error/error-response.js";
import bookService from "./book-service.js";

const updateBook = async (userIdRequest, bookIdRequest) => {
    const userId = userIdRequest ?? null

    const date = bookService.getRightDate(new Date())

    return prismaClient.book.update({
        where: {
            id: bookIdRequest
        },
        data: {
            userId: userId,
            lastBorrowedAt: date
        }
    })
}

const updateReturnBook = async (userIdRequest, bookIdRequest) => {
    const userId = userIdRequest ?? null

    const date = bookService.getRightDate(new Date())

    return prismaClient.book.update({
        where: {
            id: bookIdRequest
        },
        data: {
            userId: null,
            lastBorrowedAt: null
        }
    })
}

const borrow = async (token, bookId) => {
    const book= await prismaClient.book.findUnique({
        where: {
            id: bookId
        },
        select: {
            id: true,
            userId: true
        }
    })

    const user = await prismaClient.user.findFirst({
        where: {
            token: token
        },
        select: {
            id: true
        }
    })

    if(!book) {
        throw new ErrorResponse(404, "Book is not found")
    }

    if(book.userId !== null) {
        throw new ErrorResponse(404, "Book is already borrowed")
    }

    return await updateBook(user.id, book.id)
}

const returned = async (token, bookId) => {
    const book= await prismaClient.book.findUnique({
        where: {
            id: bookId
        },
        select: {
            id: true,
            userId: true
        }
    })

    const user = await prismaClient.user.findFirst({
        where: {
            token: token
        },
        select: {
            id: true
        }
    })

    if(!book) {
        throw new ErrorResponse(404, "Book is not found")
    }

    if(book.userId === null) {
        throw new ErrorResponse(404, "Book is not already borrowed")
    }

    return await updateReturnBook(user.id, book.id)
}

export default {
    borrow,
    returned
}