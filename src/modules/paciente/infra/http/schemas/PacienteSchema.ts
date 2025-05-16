import { celebrate, Joi, Segments } from "celebrate";

export const PacienteSchema = celebrate({
    [Segments.BODY]: Joi.object().keys({
        id: Joi.number().integer().positive().required(),
        telefone: Joi.string()
            .pattern(/^[1-9][0-9]\s\d{9}$/)
            .required()
            .messages({
                'string.empty': 'O telefone não pode ser vazio.',
                'string.pattern.base': 'O telefone deve estar no formato DD NNNNNNNNN, ex: 23 123446587.'
            }),
        data_nascimento: Joi.date().less('now').required(),
    })
})