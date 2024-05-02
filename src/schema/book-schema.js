import Joi from "joi";

const createSchema = Joi.object({
    title: Joi.string().min(5). max(100).required(),
    author: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(100),
    pages: Joi.number().min(2).required(),
    releasedDate: Joi.date().max("now").required(),
})

const updateSchema = Joi.object({
    title: Joi.string().min(5). max(100).required(),
    author: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(100),
    pages: Joi.number().min(2).required(),
    releasedDate: Joi.date().max("now").required(),
})

export {
    createSchema,
    updateSchema
}