import {PrismaClient} from "@prisma/client"
import logger from "./logging.js";

export const prismaClient = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'query',
        },
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'info',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
})

prismaClient.$on('query', (e) => {
    logger.info(`${e.query} : ${e.timestamp}`)
})

prismaClient.$on('info', (e) => {
    logger.info(`${e.message} : ${e.timestamp}`)
})

prismaClient.$on('error', (e) => {
    logger.error(`${e.message} : ${e.timestamp}`)
})

prismaClient.$on('warn', (e) => {
    logger.warn(`${e.message} : ${e.timestamp}`)

})