import { celebrate, Joi, Segments } from "celebrate";

export const sessaoSchema = celebrate({
    [Segments.BODY]: {
        email: Joi.string().email().required(),
        senha_hash: Joi.string().required()
    }
})