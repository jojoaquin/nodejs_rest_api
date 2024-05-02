import ErrorResponse from "../error/error-response.js";
import {prismaClient} from "../application/database.js";

const authMiddleware = async (req, res, next) => {
    const token = req.get("Authorization")
    if (!token) {
        res.status(401).send({
            error: "Unauthorized"
        })
    } else {
        const user = await prismaClient.user.findFirst({
            where: {
                token: token
            },
            select: {
                expired_at: true
            }
        })

        if (!user) {
            res.status(404).send({
                error: "User is not found with this token"
            })
        } else {
            if (user.expired_at <= Date.now()) {
                res.status(400).send({
                    error: "Token is expired"
                })
            }
            next()
        }
    }
}

export default authMiddleware