import validate from "../schema/validation.js";
import {loginSchema, registerSchema} from "../schema/user-schema.js";
import {prismaClient} from "../application/database.js";
import ErrorResponse from "../error/error-response.js";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

const register = async (request) => {
    const user = validate(registerSchema, request)

    const userCount = await prismaClient.user.count({
        where: {
            OR: [
                {
                    email: user.email
                },
                {
                    username: user.username
                }
            ]
        }
    })

    if (userCount >= 1) {
        throw new ErrorResponse(400, "Username or Email is already exist")
    }

    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.user.create({
        data: user,
        select: {
            id: true,
            email: true,
            username: true,
        }
    })
}

const login = async (request) => {
    const loginRequest = validate(loginSchema, request)

    const user = await prismaClient.user.findUnique({
        where: {
            email: loginRequest.email
        },
        select: {
            email: true,
            password: true
        }
    })

    if (!user) {
        throw new ErrorResponse(401, "Username or Password is wrong")
    }

    const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)

    if (!isPasswordValid) {
        throw new ErrorResponse(401, "Username or Password is wrong")
    }

    return prismaClient.user.update({
        where: {
            email: user.email
        },
        data: {
            token: uuid().toString(),
            expired_at: Date.now() + (7 * 24 * 60 * 60 * 1000)
        },
        select: {
            token: true
        }
    })
}

export default {
    register,
    login
}