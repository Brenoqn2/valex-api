import { Schema } from "joi";

export default function validateSchema(input: any, schema: Schema) {
  const validation = schema.validate(input);

  if (validation.error) {
    console.log(validation.error.details);
    return validation;
  } else {
    return true;
  }
}
