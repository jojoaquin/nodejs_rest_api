import Joi from "joi";

const createSchema = Joi.object({
    title: Joi.string().min(5). max(100).required(),
    author: Joi.string().min(3).max(100).required(),
    description: Joi.string().min(10).max(100),
    pages: Joi.number().min(3).required(),
    releasedDate: Joi.date().max("now").required(),
    image: Joi.object({
        filename: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg', 'image/png', 'image/gif').required()
    })
})

export {
    createSchema
}