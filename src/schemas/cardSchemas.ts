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

const listSchema = joi.object({
  employeeId: joi.number().required(),
  passwords: joi
    .array()
    .max(5)
    .items(
      joi
        .string()
        .pattern(/^[0-9]{4}$/)
        .required()
    )
    .required(),
});

const blockSchema = joi.object({
  cardId: joi.number().required(),
  password: joi
    .string()
    .pattern(/^[0-9]{4}$/)
    .required(),
});

export { createSchema, activateSchema, listSchema, blockSchema };
