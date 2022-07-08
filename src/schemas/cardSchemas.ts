import joi from "joi";

const createSchema = joi.object({
  type: joi
    .string()
    .valid("groceries", "restaurants", "transport", "education", "health")
    .required(),
  employeeId: joi.number().required(),
});

export { createSchema };
