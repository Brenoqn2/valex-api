import joi from "joi";

const createSchema = joi.object({
  type: joi
    .string()
    .valid("groceries", "restaurants", "transport", "education", "health")
    .required(),
  employeeId: joi.number().required(),
});

const activateSchema = joi.object({
  cvc: joi
    .string()
    .pattern(/^[0-9]{3}$/)
    .required(),
  password: joi
    .string()
    .pattern(/^[0-9]{4}$/)
    .required(),
  cardId: joi.number().required(),
});

export { createSchema, activateSchema };
