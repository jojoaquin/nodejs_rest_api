import userService from "../service/user-service.js";

const register = async (req, res, next) => {
    try {
        const user = await userService.register(req.body)

        res.status(200).send({
            id: user.id,
            email: user.email,
            username: user.username,
        })
    } catch (e) {
        next(e)
    }
}


const login = async (req, res, next) => {
    try {
        const user = await userService.login(req.body)

        res.status(200).send({
            token: user.token
        })
    } catch (e) {
        next(e)
    }
}


export default {
    register,
    login
}
