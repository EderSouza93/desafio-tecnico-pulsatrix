import { celebrate, Joi, Segments } from "celebrate";

export const createUsuarioSchema = celebrate({
    [Segments.BODY]: Joi.object().keys({
        nome: Joi.string().required(),
        email: Joi.string().email().required(),
        senha_hash: Joi.string().required(),
        tipo: Joi.string()
            .valid('MEDICO', 'PACIENTE')
        .required(),
    })
})