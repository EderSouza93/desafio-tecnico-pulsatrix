import { celebrate, Joi, Segments } from "celebrate";

export const medicoSchema = celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
        especialidade: Joi.string().min(5).required(),
        crm: Joi.string().min(5).required(),
    })
})