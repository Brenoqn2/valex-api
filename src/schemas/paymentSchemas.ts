import joi from "joi";

const buySchema = joi.object({
  cardId: joi.number().required(),
  password: joi
    .string()
    .pattern(/^[0-9]{4}$/)
    .required(),
  amount: joi.number().positive().required(),
  businessId: joi.number().required(),
});

export { buySchema };
