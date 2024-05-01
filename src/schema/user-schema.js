import Joi from "joi";

const registerSchema = Joi.object({
    email: Joi.string().email().max(100).required(),
    username: Joi.string().min(3).max(100).required(),
    password: Joi.string().min(6).max(100).required()
})

const loginSchema = Joi.object({
    email: Joi.string().email().max(100).required(),
    password: Joi.string().min(6).max(100).required()
})

export {
    registerSchema,
    loginSchema
}