import Joi from "joi";
import { validateRequest } from "../middleware";

function registerSchema(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.string()
      .length(13)
      .pattern(/^[+0-9]+$/)
      .required()
      .messages({
        "string.base": `Phone Number should be a type of string`,
        "string.empty": `Phone Number must contain value`,
        "string.pattern.base": `Phone Number must be enter in valid format`,
        "any.required": `Phone Number is a required field`,
      }),
    password: Joi.string().min(6).max(30).required().messages({
      "string.base": `Password should be a type of string`,
      "string.empty": `Password must contain value`,
      "string.pattern.base": `Password must be minimum 6 and maximum 30 character required.`,
      "any.required": `Password is a required field`,
    }),
    name: Joi.string()
      .regex(/^[a-zA-Z]+$/)
      .required()
      .messages({
        "string.base": `Name should be a type of string`,
        "string.empty": `Name must contain value`,
        "string.pattern.base": `Name must be enter in valid format`,
        "any.required": `Name is a required field`,
      }),
    additionalinfo: Joi.string()
      .regex(/^[a-zA-Z0-9._,@#$%]*$/)
      .required()
      .messages({
        "string.base": `Name should be a type of string`,
        "string.empty": `Name must contain value`,
        "string.pattern.base": `Name must be enter in valid format`,
        "any.required": `Name is a required field`,
      }),
  }).unknown(true);
  validateRequest(req, res, next, schema);
}

export default { registerSchema };
