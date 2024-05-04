import {prismaClient} from "../src/application/database.js";

describe('Rest API', () => {
    it('should can create many books', async () => {
        let arr = []
        for (let i = 1; i <= 16; i++) {
            arr.push({
                title: `Title ${i}`,
                author: `Author ${i}`,
                pages: i + i + i,
                releasedDate: new Date(2023, 0, 1),
                image: `Image ${i}`
            })
        }

        const books = await prismaClient.book.createMany({
            data: arr
        })
    });

    it('should get user', async () => {
        const user = await prismaClient.user.findFirst({
            where: {
                 token: {
                     not: null
                 }
            },
            include: {
                books: true
            }
        })

        console.info(user.books)
    });
});