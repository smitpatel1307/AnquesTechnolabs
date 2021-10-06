import express from "express";
import { usercontroller } from "../controllers";
import { INTERNAL_LINK } from "../enum";
import { validationSchema } from "../joiSchema";
export default express
  .Router()
  .post(
    INTERNAL_LINK.USER.REGISTER,
    validationSchema.registerSchema,
    usercontroller.Register
  )
  .get(INTERNAL_LINK.USER.ALL_USER, usercontroller.getAllUser)
  .delete(INTERNAL_LINK.USER.DELETE_USER, usercontroller.removeUser);
