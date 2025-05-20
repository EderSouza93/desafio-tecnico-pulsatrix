import { celebrate, Joi, Segments } from "celebrate";

export const createAgendamentoSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    medico_id: Joi.number().integer().required(),
    data: Joi.string()
      .pattern(/^\d{4}-\d{2}-\d{2}$/)
      .required()
      .messages({
        "string.pattern.base": "Data deve estar no formato YYYY-MM-DD",
      }),
    hora_inicio: Joi.string()
      .pattern(/^\d{2}:\d{2}(:\d{2})?$/)
      .required()
      .messages({
        "string.pattern.base": "Hora de início inválida. Use HH:mm:ss",
      }),
    hora_fim: Joi.string()
      .pattern(/^\d{2}:\d{2}(:\d{2})?$/)
      .required()
      .messages({
        "string.pattern.base": "Hora de fim inválida. Use HH:mm:ss",
      }),
  }),
});