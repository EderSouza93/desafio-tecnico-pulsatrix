import { celebrate, Joi, Segments } from "celebrate";

export const updateStatusSchema = celebrate({
  [Segments.BODY]: Joi.object().keys({
    status: Joi.string()
      .valid("CANCELADO", "REALIZADO")
      .required()
      .messages({ "any.only": "Status deve ser CANCELADO ou REALIZADO" }),
  }),
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
});