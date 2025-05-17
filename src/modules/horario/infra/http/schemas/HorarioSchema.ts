import { celebrate, Joi, Segments } from "celebrate";

export const horarioSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    medico_id: Joi.number().integer().positive().required(),
    data: Joi.date().iso().required(),
    hora_inicio: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required(),
    hora_fim: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .required(),
  }),
});